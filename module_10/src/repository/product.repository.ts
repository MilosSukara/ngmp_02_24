import { Product } from "../service/entity.schema";
import { DB } from "./db"
export const productRepository = {
  all: (): Product[] => DB.products,
  get: (id: string): Product | null => DB.products.find(pr => pr.id === id) ?? null,
}