import { Cart, Order, Product, User } from "../service/entity.schema"

export const DB = {
  products: [
    {
      id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
      title: "Book",
      description: "Interesting book",
      price: 200
    },
    {
      id: "5c293ad0-19d0-41ee-baa3-4c648f9f76912",
      title: "Pen",
      description: "Cute pen",
      price: 30
    },
  ],
  users: [
    {
      id: 'admin',
      email: "admin@ngmp.com",
      password: "",
      role: "admin"
    },
    {
      id: 'empty-cart',
      email: "e.cart@ngmp.com",
      password: "",
      role: "user"
    },
    {
      id: 'no-cart',
      email: "n.cart@ngmp.com",
      password: "",
      role: "user"
    },
    {
      id: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
      email: "j.doe@ngmp.com",
      password: "",
      role: "user"
    }
  ],
  carts: [
    {
      "id": "0c2eb723-9cb3-4510-96a6-9510135a2999",
      "isDeleted": false,
      "userId": "admin",
      "items": [
        {
          product: {
            id: "5c293ad0-19d0-41ee-baa3-4c648f9f7697",
            title: "Book",
            description: "Interesting book",
            price: 200
          },
          count: 2,
        },
        {
          product: {
            id: "5c293ad0-19d0-41ee-baa3-4c648f9f76912",
            title: "Pen",
            description: "Cute pen",
            price: 30
          },
          count: 1
        },
      ]
    },
    {
      "id": "0c2eb723-9cb3-4510-96a6-9510135a2999",
      "isDeleted": false,
      "userId": "empty-cart",
      "items": []
    },
  ],
  orders: [],
} as {
  products: Product[],
  users: User[],
  carts: Cart[],
  orders: Order[],
}