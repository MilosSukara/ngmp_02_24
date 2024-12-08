import { NextFunction, Request, Response } from "express";
import { userRepository } from "../repository/user.repository";
import { ErrorResponse } from "./http.schema";
import * as jwt from "jsonwebtoken";

export const userAuthorizationMiddleware = (req: Request<any, any, { "x-user-id": string }>, res: Response<ErrorResponse>, next: NextFunction) => {
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
    next();
    return;
  }
  const user = userRepository.get(id);
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


export interface CurrentUser {
  id: string,
  email: string,
  role: string
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).send(
      {
        "data": null,
        "error": {
          "message": "You must be authorized user"
        }
      }
    );
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    return res.status(403).send({
      "data": null,
      "error": {
        "message": "You must be authorized user"
      }
    });
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as CurrentUser;
    req.headers = {
      ...req.headers,
      'x-user-id': user.id,
    }
  } catch (err) {
    return res.status(401).send({
      "data": null,
      "error": {
        "message": "User is not authorized"
      }
    });
  }
  return next();
}

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = userRepository.get(req.get('x-user-id') ?? '');
  if (user?.role != "admin") {
    return res.status(401).send({
      "data": null,
      "error": {
        "message": "You must be authorized user"
      }
    });
  }
  return next();
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