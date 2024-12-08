import { Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";
import { Cart } from "./cart.entity.js";
import { Order } from "./order.entity.js";

@Entity()
export class User {
  @PrimaryKey()
  id = v4();

  @Property()
  name!: string;

  @OneToMany('Cart', 'user', { nullable: true })
  carts = new Collection<Cart>(this);

  @OneToMany('Order', 'user', { nullable: true })
  orders = new Collection<Order>(this);


  constructor(name: string) {
    this.name = name;
  }
}