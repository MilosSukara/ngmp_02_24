import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { userRepository } from "../repository/user.repository";

export const registerUserValidator = (req: Request, res: Response, next: NextFunction) => {
  const validator = Joi.object({
    email: Joi.string().email().required().custom((value, helper) => {
      const user = userRepository.findByEmail(value);
      if (user != null) {
        return helper.message({ custom: "Email is already in use." });
      }
      return true;
    }),
    password: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin')
  });

  const { error, value } = validator.validate(req.body ?? {});
  if (error == null) {
    next();
    return;
  }
  res.statusCode = 400;
  res.send({

    "data": null,
    "error": {
      "message": "Email is not valid"
    }
  })
  res.end();
}