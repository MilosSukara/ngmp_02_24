import { Cart } from "../entities/cart.entity.js";
import { User as UserEntity } from "../entities/user.entity.js";
import { DI } from "../index.js";
import { CartItem,  } from "../service/entity.schema.js";
import { userRepository } from "./user.repository.js";

export const cartRepository = {
  all: async (): Promise<Cart[]> => await DI.carts.findAll(),
  get: async (id: string): Promise<Cart | null> => await DI.carts.findOne(id),
  getByUserId: async (id: string): Promise<Cart | null> => await DI.carts.findOne({ user: { id }, isDeleted: false }),
  create: async (userId: string): Promise<Cart> => {
    const user = await userRepository.get(userId);
    if (user == null) {
      throw new Error("Invalid user id");
    }
    const cart = new Cart(user as UserEntity);
    await DI.em.persist(cart).flush();
    return cart;
  },
  async updateItems(id: string, items: CartItem[]): Promise<Cart | null> {
    let cart = await DI.carts.findOne(id);
    if(cart == null) {
      return null;
    }
    cart.items = items;
    await DI.em.persist(cart).flush();
    return cart;
  },
}