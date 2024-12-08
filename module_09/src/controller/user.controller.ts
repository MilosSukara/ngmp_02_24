import { Request, RequestHandler, Response } from "express";
import { ErrorResponse, LoginResponse, ProductResponse, ProductsResponse, RegisterResponse } from "./http.schema";
import * as jwt from "jsonwebtoken";
import { userRepository } from "../repository/user.repository";
import bcrypt from "bcrypt"

export const userController = {
  register: (req: Request<any, any, { email: string, password: string, role: "admin" | "user" }>, res: Response<RegisterResponse>) => {
    const user = userRepository.create({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      role: req.body.role
    });
    let response: RegisterResponse = {
      data: user,
      error: null
    };
    res.send(response);
  },
  login: (req: Request<any, any, { email: string, password: string }>, res: Response<LoginResponse | ErrorResponse>) => {
    const user = userRepository.findByEmail(req.body.email);
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.TOKEN_KEY!,
        {
          expiresIn: "2h",
        }
      );
      return res.send({
        data: {
          token
        },
        error: null
      });
    }
    res.status(404).send({
      data: null,
      error: {
        message: "No user with such email or password"
      }
    });
  },
} as Record<string, RequestHandler>