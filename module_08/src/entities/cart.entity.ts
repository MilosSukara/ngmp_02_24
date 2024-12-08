import { Entity, ManyToOne, OneToOne, PrimaryKey, Property, ref } from "@mikro-orm/core";
import type { Ref } from '@mikro-orm/core';
import { v4 } from "uuid";
import { User } from "./user.entity.js";
import { Order } from "./order.entity.js";
import { CartItem } from "../service/entity.schema.js";

@Entity()
export class Cart {
  @PrimaryKey()
  id = v4();

  @Property({ default: false })
  isDeleted!: boolean;

  @ManyToOne(() => User, { ref: true })
  user!: Ref<User>;

  @OneToOne(() => Order, { ref: true, nullable: true })
  order?: Ref<Order>;

  @Property({ type: "json", default: JSON.stringify([]) })
  items!: CartItem[];

  constructor(user: User) {
    this.items = [];
    this.isDeleted = false;
    this.user = ref(user);
  }
}