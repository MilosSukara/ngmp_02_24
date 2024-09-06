import { DI } from "../index.js";
import { Product } from "../service/entity.schema.js";
export const productRepository = {
  all: async (): Promise<Product[]> => await DI.products.findAll() as Product[],
  get: async (id: string): Promise<Product | null> => await DI.products.findOne(id) as Product | null,
}