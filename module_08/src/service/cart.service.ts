import { cartRepository } from "../repository/cart.repository.js";
import { orderRepository } from "../repository/order.repository.js";
import { productRepository } from "../repository/product.repository.js";
import { CartItem, Order, Product } from "./entity.schema.js";
import { Cart } from "../entities/cart.entity.js"

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
  getCart: async (userId: string) => {
    if (userId == '') {
      throw new Error("Invalid user id");
    }
    return await cartRepository.getByUserId(userId) ?? await cartRepository.create(userId);
  },

  updateCart: async (userId: string, payload: { productId: string, count: number }): Promise<SuccesfullUpdate | FailedUpdate> => {
    const cart = await cartRepository.getByUserId(userId) ?? null;
    if (cart === null) {
      return { cart: null, error: CartServiceErrorResponses.CartNotFound };
    }

    const productItem = cart.items.find(prod => prod.product.id === payload.productId) ?? null;
    if (productItem === null) {
      if (payload.count === 0) {
        return { cart: null, error: CartServiceErrorResponses.DroppingNonExistingProduct };
      }

      const newProduct = await productRepository.get(payload.productId);

      if (newProduct === null) {
        return { cart: null, error: CartServiceErrorResponses.ProductNotFound };;
      }

      const updatedCart = await addNewProduct(cart, newProduct, payload.count);

      if (updatedCart === null) {
        return { cart: null, error: CartServiceErrorResponses.CartNotFound };
      }
      return { cart: updatedCart, error: null }
    }

    if (payload.count === 0) {
      const updatedCart = await dropProduct(cart, payload.productId);
      if (updatedCart === null) {
        return { cart: null, error: CartServiceErrorResponses.CartNotFound };
      }
      return {
        cart: updatedCart,
        error: null
      };
    }

    const updatedCart = await updateProductCount(cart, payload.productId, payload.count);
    if (updatedCart === null) {
      return { cart: null, error: CartServiceErrorResponses.CartNotFound };
    }

    return {
      cart: updatedCart,
      error: null
    };
  },

  emptyCart: async (userId: string): Promise<Cart | null> => {
    const cart = await cartRepository.getByUserId(userId) ?? null;
    if (cart === null) {
      return null;
    }
    return await cartRepository.updateItems(cart.id, []);
  },

  async checkout(userId: string): Promise<{ order: Omit<Order, "payment" | "delivery" | "comments">, error: null } | FailedCheckout> {
    const cart = await cartRepository.getByUserId(userId);
    if (cart == null) {
      return { order: null, error: CartServiceErrorResponses.CartNotFound }
    }
    if (cart.items.length === 0) {
      return { order: null, error: CartServiceErrorResponses.CartIsEmpty }
    }

    const order = await orderRepository.create({
      cart,
      items: structuredClone(cart.items),
      total: this.getTotal(cart.items)
    })

    return {
      order: {
        id: order.id,
        userId: order.user.id,
        cartId: order.cart.id,
        items: order.items,
        status: order.status,
        total: order.total
      },
      error: null
    }
  },
  getTotal: (items: CartItem[]): number => items.reduce((acc: number, item: CartItem) => acc += item.product.price * item.count, 0)
}

const addNewProduct = async (cart: Cart, newProduct: Product, count: number): Promise<Cart | null> => await cartRepository.updateItems(cart.id, [
  ...cart.items || [],
  {
    product: newProduct,
    count: count
  }
]);

const dropProduct = async (cart: Cart, productId: string): Promise<Cart | null> => await cartRepository.updateItems(cart.id, cart.items.filter(item => item.product.id !== productId));

const updateProductCount = async (cart: Cart, productId: string, count: number): Promise<Cart | null> =>
  await cartRepository.updateItems(cart.id, cart.items.map(item =>
    (item.product.id === productId ? { ...item, count: count } : item)
  ));