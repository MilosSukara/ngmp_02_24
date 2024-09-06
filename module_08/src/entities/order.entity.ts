import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, ref } from "@mikro-orm/core";
import { Ref } from '@mikro-orm/core';
import { v4 } from "uuid";
import { User } from "./user.entity.js";
import { Cart } from "./cart.entity.js";
import { CartItem } from "../service/entity.schema.js";

export interface OrderData {
  cart: Cart,
  items: CartItem[],
  payment: { type: string, address: string, creditCard: string };
  delivery: { type: string, address: string };
  comments: string,
  status: string,
  total: number,
}

@Entity()
export class Order {

  @PrimaryKey()
  id = v4();

  @ManyToOne(() => User, { ref: true })
  user!: Ref<User>;

  @OneToOne(() => Cart, { ref: true })
  cart!: Ref<Cart>;

  @Property({ type: "json", default: JSON.stringify([]) })
  items!: OrderData['items'];

  @Property({ type: "json", default: JSON.stringify({}) })
  payment!: OrderData['payment'];

  @Property({ type: "json", default: JSON.stringify({}) })
  delivery!: OrderData['delivery'];

  @Property({ default: "" })
  comments!: OrderData['comments'];

  @Property()
  status!: OrderData['status'];

  @Property({ default: 0 })
  total!: number;

  constructor(orderData: OrderData) {
    this.cart = ref(orderData.cart);
    this.user = ref(orderData.cart.user);
    this.items = orderData.items;
    this.payment = orderData.payment;
    this.delivery = orderData.delivery;
    this.comments = orderData.comments;
    this.status = orderData.status;
    this.total = orderData.total;
  }
}