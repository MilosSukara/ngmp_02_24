import { Product } from "../service/entity.schema.js";
import { DB } from "./db.js"
export const productRepository = {
  all: (): Product[] => DB.products,
  get: (id: string): Product | null => DB.products.find(pr => pr.id === id) ?? null,
}