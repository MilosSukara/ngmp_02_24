import { DI } from "../index.js";
import { User } from "../service/entity.schema.js";
export const userRepository = {
  all: async (): Promise<User[]> => await DI.users.findAll() as User[],
  get: async (id: string): Promise<User | null> => await DI.users.findOne(id) as User | null,
  findByName: async (name: string): Promise<User | null> => await DI.users.findOne({ name: name }) as User | null
}