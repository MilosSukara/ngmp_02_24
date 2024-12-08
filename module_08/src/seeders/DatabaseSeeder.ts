import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { Product } from '../entities/product.entity.js';
import { User } from '../entities/user.entity.js';
import { Cart } from '../entities/cart.entity.js';

export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    const product1 = em.create(Product, {
      title: "Book",
      description: "Interesting book",
      price: 200
    });

    const product2 = em.create(Product, {
      title: "Pen",
      description: "Cute pen",
      price: 30
    });

    const admin = em.create(User, {
      name: "Admin",
    });

    const emptyCartUser = em.create(User, {
      name: "Empty Cart",
    });

    em.create(User, {
      name: "No Cart",
    });

    em.create(User, {
      name: "John Doe",
    });

    em.create(Cart, {
      isDeleted: false,
      user: admin,
      order: undefined,
      items: [
        {
          product: product1,
          count: 2
        },
        {
          product: product2,
          count: 1
        }
      ]
    });

    em.create(Cart, {
      isDeleted: false,
      order: undefined,
      user: emptyCartUser,
      items: [],
    })

  }

}
