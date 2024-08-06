import { CartEntity, OrderEntity, ProductEntity } from "./entity.schema"

export type PublicCart = Pick<CartEntity, "id" | "items">

export interface CartResponse {
  data: {
    cart: PublicCart,
    total: number,
  }
  error: ErrorResponseBody | null
}

export interface CheckoutRespone {
  data: {
    order: OrderEntity,
  },
  error: ErrorResponseBody | null
}

export interface ProductResponse {
  data: ProductEntity | null,
  error: ErrorResponseBody | null
}

export interface ProductsResponse {
  data: ProductEntity[] | null,
  error: ErrorResponseBody | null
}

export interface UpdateCartRequestBody {
  productId: string,
  count: number,
}

export interface EmptySuccessResponse {
  data: {
    success: boolean,
  } | null,
  error: ErrorResponseBody | null
}


export interface ErrorResponseBody {
  message: string,
}

export interface ErrorResponse {
  data: null,
  error: ErrorResponseBody
}