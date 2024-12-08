import { v4 as uuid } from "uuid";
import { User } from "../service/entity.schema";
import { DB } from "./db";

export const userRepository = {
  all: (): User[] => DB.users,
  get: (id: string): User | null => DB.users.find(pr => pr.id === id) ?? null,
  findByEmail: (email: string): User | null => DB.users.find(pr => pr.email === email) ?? null,
  create: (userData: Omit<User, "id">): User => {
    const user = {
      id: uuid(),
      ...userData
    };
    DB.users.push(user);
    return user;
  }
}