import { User } from "../service/entity.schema";
import { DB } from "./db";

export const userRepository = {
  all: (): User[] =>  DB.users,
  get: (id: string): User | null => DB.users.find(pr => pr.id === id) ?? null,
}