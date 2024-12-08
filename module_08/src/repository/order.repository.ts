import { DI } from "../index.js";
import { OrderData, Order } from "../entities/order.entity.js";
import { CartItem } from "../service/entity.schema.js";
import { Cart } from "../entities/cart.entity.js";

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
  all: async (): Promise<Order[]> => await DI.orders.findAll(),
  get: async (id: string): Promise<Order | null> => await DI.orders.findOne(id),
  create: async (orderData: { cart: Cart, items: CartItem[], total: number }): Promise<Order> => {

    const orderDataPayload: OrderData = {
      cart: orderData.cart,
      items: orderData.items,
      ...EXTRA_ORDER_DATA,
      total: orderData.total
    };
    const order = new Order(orderDataPayload);
    orderData.cart.isDeleted = true;
    DI.em.persist(order).flush();
    return order;
  }
}