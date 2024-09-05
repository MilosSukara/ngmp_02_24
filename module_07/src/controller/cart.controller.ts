import { Request, RequestHandler, Response } from "express";
import { cartService, CartServiceErrorResponses } from "../service/cart.service";
import { CartResponse, EmptySuccessResponse, ErrorResponse, PublicCart } from "../schema/http.schema";


export const getPublicCart = ({ id, items }: PublicCart) => ({ id, items });


export const cartController = {

  getCart: async (req: Request, res: Response<CartResponse>) => {
    const userId = req.get('x-user-id') ?? '';
    const cart = await cartService.getCart(userId);
    res.send({
      data: {
        cart: getPublicCart(cart),
        total: cartService.getTotal(cart.items)
      },
      error: null,
    });
    res.end();
  },

  updateCart: async (req: Request<any, any, { productId: string, count: number }>, res: Response<CartResponse | ErrorResponse>) => {
    const userId = req.get('x-user-id') ?? '';
    const { cart, error } = await cartService.updateCart(userId, { productId: req.body.productId, count: req.body.count });
    if (error != null) {
      switch (error) {
        case CartServiceErrorResponses.CartNotFound: {
          res.statusCode = 404;
          res.send({
            "data": null,
            "error": {
              "message": "Cart was not found"
            }
          });
          res.end()
          return;
        }
        case CartServiceErrorResponses.DroppingNonExistingProduct:
        case CartServiceErrorResponses.ProductNotFound: {
          res.statusCode = 400;
          res.send({
            "data": null,
            "error": {
              "message": "Products are not valid"
            }
          });
          res.end()
          return;
        }
      }
    }

    if (error === null) {
      res.send({
        data: {
          cart: getPublicCart(cart),
          total: cartService.getTotal(cart.items)
        },
        error: null
      });
      res.end();
      return;
    }
    throw new Error("Unhaneld state");
  },

  deleteCart: async (req: Request, res: Response<EmptySuccessResponse | ErrorResponse>) => {
    const userId = req.get('x-user-id') ?? '';
    const cart = await cartService.emptyCart(userId);
    if (cart === null) {
      res.statusCode = 404;
      res.send({
        "data": null,
        "error": {
          "message": "Cart was not found"
        }
      });
      res.end()
      return;
    }
    res.send({
      data: {
        success: true,
      },
      error: null
    });
    res.end();
  },

  checkoutCart: async (req: Request, res: Response) => {
    const userId = req.get('x-user-id') ?? '';
    const { order, error } = await cartService.checkout(userId);
    if (error != null) {
      switch (error) {
        case CartServiceErrorResponses.CartNotFound: {
          res.statusCode = 404;
          res.send({
            "data": null,
            "error": {
              "message": "Cart was not found"
            }
          });
          res.end()
          return;
        }
        case CartServiceErrorResponses.CartIsEmpty: {
          res.statusCode = 400;
          res.send({
            "data": null,
            "error": {
              "message": "Cart is empty"
            }
          });
          res.end()
          return;
        }
      }
    }

    if (error === null) {
      res.send({
        data: {
          order: order,
        },
        error: null
      });
      res.end();
      return;
    }
    throw new Error("Unhaneld state");
  }
} as Record<string, RequestHandler>
