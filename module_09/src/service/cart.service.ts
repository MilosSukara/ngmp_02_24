import { cartRepository } from "../repository/cart.repository";
import { orderRepository } from "../repository/order.repository";
import { productRepository } from "../repository/product.repository";
import { Cart, CartItem, Order, Product } from "./entity.schema";

export enum CartServiceErrorResponses {
  CartNotFound = "cart_not_found",
  DroppingNonExistingProduct = "dropping_non_existing_product",
  ProductNotFound = "product_not_found",
  CartIsEmpty = "cart_is_empty"
}

type SuccesfullUpdate = {
  cart: Cart,
  error: null
}
type FailedUpdate = {
  cart: null,
  error: CartServiceErrorResponses
}

type FailedCheckout = {
  order: null,
  error: CartServiceErrorResponses,
}


export const cartService = {
  getCart: (userId: string) => {
    if (userId == '') {
      throw new Error("Invalid user id");
    }
    return cartRepository.getByUserId(userId) ?? cartRepository.create(userId);
  },

  updateCart: (userId: string, payload: { productId: string, count: number }): SuccesfullUpdate | FailedUpdate => {
    const cart = cartRepository.getByUserId(userId) ?? null;
    if (cart === null) {
      return { cart: null, error: CartServiceErrorResponses.CartNotFound };
    }

    const productItem = cart.items.find(prod => prod.product.id === payload.productId) ?? null;
    if (productItem === null) {
      if (payload.count === 0) {
        return { cart: null, error: CartServiceErrorResponses.DroppingNonExistingProduct };
      }

      const newProduct = productRepository.get(payload.productId);

      if (newProduct === null) {
        return { cart: null, error: CartServiceErrorResponses.ProductNotFound };;
      }

      const updatedCart = addNewProduct(cart, newProduct, payload.count);

      if (updatedCart === null) {
        return { cart: null, error: CartServiceErrorResponses.CartNotFound };
      }
      return { cart: updatedCart, error: null }
    }

    if (payload.count === 0) {
      const updatedCart = dropProduct(cart, payload.productId);
      if (updatedCart === null) {
        return { cart: null, error: CartServiceErrorResponses.CartNotFound };
      }
      return {
        cart: updatedCart,
        error: null
      };
    }

    const updatedCart = updateProductCount(cart, payload.productId, payload.count);
    if (updatedCart === null) {
      return { cart: null, error: CartServiceErrorResponses.CartNotFound };
    }

    return {
      cart: updatedCart,
      error: null
    };
  },

  emptyCart: (userId: string): Cart | null => {
    const cart = cartRepository.getByUserId(userId) ?? null;
    if (cart === null) {
      return null;
    }
    return cartRepository.update(cart.id, {
      ...cart,
      items: []
    });
  },

  checkout(userId: string): { order: Order, error: null } | FailedCheckout {
    const cart = cartRepository.getByUserId(userId);
    if (cart == null) {
      return { order: null, error: CartServiceErrorResponses.CartNotFound }
    }
    if (cart.items.length === 0) {
      return { order: null, error: CartServiceErrorResponses.CartIsEmpty }
    }

    const order = orderRepository.create({
      userId: userId,
      cartId: cart.id,
      items: structuredClone(cart.items),
      total: this.getTotal(cart.items)
    })

    return {
      order: order,
      error: null
    }
  },
  getTotal: (items: CartItem[]): number => items.reduce((acc: number, item: CartItem) => acc += item.product.price * item.count, 0)
}

const addNewProduct = (cart: Cart, newProduct: Product, count: number): Cart | null => cartRepository.update(cart.id, {
  ...cart,
  items: [
    ...cart.items || [],
    {
      product: newProduct,
      count: count
    }
  ]
});

const dropProduct = (cart: Cart, productId: string): Cart | null => cartRepository.update(cart.id, {
  ...cart,
  items: cart.items.filter(item => item.product.id !== productId)
});

const updateProductCount = (cart: Cart, productId: string, count: number): Cart | null => cartRepository.update(cart.id, {
  ...cart,
  items: cart.items.map(item => {
    if (item.product.id === productId) {
      return {
        ...item,
        count: count,
      };

    }
    return item;
  })
});