import { Cart, User } from "../service/entity.schema";
import { DB } from "./db";
import { v4 as uuid } from "uuid";

export const cartRepository = {
  all: (): Cart[] => DB.carts,
  get: (id: string): Cart | null => DB.carts.find(pr => pr.id === id) ?? null,
  getByUserId: (id: string): Cart | null => DB.carts.find(cart => cart.userId === id && !cart.isDeleted) ?? null,
  create: (userId: string): Cart => {
    const cart = {
      id: uuid(),
      isDeleted: false,
      userId: userId,
      items: [],
    }
    DB.carts.push(cart);
    return cart;
  },
  update(id: string, cart: Cart): Cart | null {
    DB.carts = DB.carts.map((c) => {
      if (c.id === id) {
        return cart;
      }
      return c;
    });
    return this.get(id);
  },
}