import { Cart, Order } from "../service/entity.schema";
import { DB } from "./db"
import { v4 as uuid } from "uuid";

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
  all: (): Order[] => DB.orders,
  get: (id: string): Order | null => DB.orders.find(pr => pr.id === id) ?? null,
  create: (orderData: Omit<Order, "id" | "payment" | "delivery" | "comments" | "status">): Order => {
    const order = {
      id: uuid(),
      userId: orderData.userId,
      cartId: orderData.cartId,
      items: orderData.items,
      ...EXTRA_ORDER_DATA,
      total: orderData.total
    };


    DB.orders.push(order);
    return order;
  }
}