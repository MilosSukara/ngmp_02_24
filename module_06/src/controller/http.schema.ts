import { Cart, Order, Product } from "../service/entity.schema"

export interface CartResponse {
  data: {
    cart: Cart,
    total: number,
  }
  error: ErrorResponseBody | null
}

export interface CheckoutRespone {
  data: {
    order: Order,
  },
  error: ErrorResponseBody | null
}

export interface ProductResponse {
  data: Product | null,
  error: ErrorResponseBody | null
}

export interface ProductsResponse {
  data: Product[] | null,
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