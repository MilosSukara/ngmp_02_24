import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { productRepository } from "../repository/product.repository";

export const updateCartValidatior = (req: Request, res: Response, next: NextFunction) => {
  const validator = Joi.object({
    productId: Joi.string().guid().required().custom((value, helper) => {
      const product = productRepository.get(value);
      if (product == null) {
        return helper.message({ custom: "Invalid product ID." });
      }
      return true;
    }),
    count: Joi.number().required().positive().allow(0),
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
      "message": "Products are not valid"
    }
  })
  res.end();
}