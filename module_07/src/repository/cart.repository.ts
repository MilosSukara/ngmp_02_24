import { CartEntity, CartItemEntity, UserEntity } from "../schema/entity.schema";
import { v4 as uuid } from "uuid";
import { Cart, ICart } from "../schema/db.schema";

export const cartRepository = {
  all: async (): Promise<CartEntity[]> => await Cart.find(),
  get: async (id: string): Promise<ICart | null> => await Cart.findById(id).exec(),
  getByUserId: async (id: string): Promise<ICart | null> => await Cart.findOne({ userId: id, isDeleted: false }).exec(),
  create: async (userId: string): Promise<ICart> => {
    const cart = new Cart({
      _id: uuid(),
      isDeleted: false,
      userId: userId,
      items: [],
    });
    const savedCart = await cart.save();
    return savedCart;
  },
  async updateItems(id: string, items: CartItemEntity[]): Promise<CartEntity | null> {
    const cart = await Cart.findById(id);
    if (cart == null) {
      return null;
    }
    cart.items = items.map(item => ({ product: { _id: item.product.id, ...item.product }, count: item.count }));
    return await cart.save();
  },
}