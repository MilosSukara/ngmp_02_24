import { OrderEntity } from "../schema/entity.schema";
import { Order } from "../schema/db.schema";

const EXTRA_ORDER_DATA = {
  "payment": {
    "type": "paypal",
    "address": "London",
    "creditCard": "1234-1234-1234-1234"
  },
  "delivery": {
    "type": "post",
    "address": "London"
  },
  "comments": "",
  "status": "created",
};

export const orderRepository = {
  all: async (): Promise<OrderEntity[]> => await Order.find(),
  get: async (id: string): Promise<OrderEntity | null> => await Order.findById(id) ?? null,
  create: async (orderData: Omit<OrderEntity, "id" | "payment" | "delivery" | "comments" | "status">): Promise<OrderEntity> => {
    const order = new Order({
      userId: orderData.userId,
      cartId: orderData.cartId,
      items: orderData.items,
      ...EXTRA_ORDER_DATA,
      total: orderData.total
    });
    return await order.save();
  }
}