import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/user.repository";
import { ErrorResponse } from "../schema/http.schema";

export const userAuthorizationMiddleware = async (req: Request<any, any, { "x-user-id": string }>, res: Response<ErrorResponse>, next: NextFunction) => {
  const id = req.get('x-user-id') ?? '';
  if (id === '') {
    res.statusCode = 403;
    res.send({
      data: null,
      error: {
        message: "You must be authorized user"
      }
    })
    res.end();
    return;
  }
  if (id === 'admin') {
    const admin = await userRepository.findByName('Admin');
    if (admin === null) {
      res.statusCode = 403;
      res.send({
        data: null,
        error: {
          message: "You must be authorized user"
        }
      })
      res.end();
      return;
    }
    req.headers = {
      ...req.headers,
      'x-user-id': admin.id,
    }
    next();
    return;
  }
  const user = await userRepository.get(id);
  if (user != null) {
    next();
    return;
  }

  res.statusCode = 403;
  res.send({
    data: null,
    error: {
      message: "User is not authorized"
    }
  })
  res.end();
  return;
}

export const setJSONResponseHeader = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Content-Type', 'application/json');
  next();
}

export const errorHandler = (err: Error, req: Request, res: Response<ErrorResponse>, next: NextFunction) => {
  console.log(err);
  res.status(500);
  res.send({ data: null, error: { message: "Internal Server error" } });
};