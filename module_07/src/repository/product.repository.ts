import { ProductEntity } from "../schema/entity.schema";
import { Product } from "../schema/db.schema";
export const productRepository = {
  all: async (): Promise<ProductEntity[]> => await Product.find(),
  get: async (id: string): Promise<ProductEntity | null> => await Product.findById(id) ?? null,
}