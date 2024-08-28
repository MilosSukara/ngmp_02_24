import { User } from "../service/entity.schema.js";
import { DB } from "./db.js";

export const userRepository = {
  all: (): User[] =>  DB.users,
  get: (id: string): User | null => DB.users.find(pr => pr.id === id) ?? null,
}