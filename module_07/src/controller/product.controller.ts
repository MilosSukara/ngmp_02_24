import { Request, RequestHandler, Response } from "express";
import { ErrorResponse, ProductResponse, ProductsResponse } from "../schema/http.schema";
import { productRepository } from "../repository/product.repository";

export const productController = {
  allProducts: async (req: Request, res: Response<ProductsResponse>) => {
    const products = await productRepository.all();
    let response: ProductsResponse = {
      data: products,
      error: null
    };
    res.send(response);
  },
  getProduct: async (req: Request<any, any, { productId: string }>, res: Response<ProductResponse | ErrorResponse>) => {
    const product = await productRepository.get(req.params.productId);
    if (product === null) {
      res.statusCode = 404;
      res.send({
        data: null,
        error: {
          message: "No product with such id"
        }
      });
      return;
    }
    res.send({
      data: product,
      error: null
    });
  },
} as Record<string, RequestHandler>