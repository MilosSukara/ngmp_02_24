export interface CartEntity {
  id: string,
  isDeleted: boolean,
  userId: string,
  items: CartItemEntity[],
}

export interface CartItemEntity {
  product: ProductEntity,
  count: number,
}

export interface ProductEntity {
  id: string,
  title: string,
  description: string,
  price: number, 
}

export interface OrderEntity {
  id: string,
  userId: string,
  cartId: string,
  items: CartItemEntity[],
  payment: {
    type: string,
    address: string,
    creditCard: string,
  },
  delivery: {
    type: string,
    address: string,
  },
  comments: string,
  status: string,
  total: number,
}


export interface UserEntity {
  id: string,
  name: string,
}