import { UserEntity } from "../schema/entity.schema";
import { IUser, User } from "../schema/db.schema";

export const userRepository = {
  all: async (): Promise<UserEntity[]> => await User.find(),
  get: async (id: string): Promise<UserEntity | null> => await User.findById(id) ?? null,
  findByName: async (name: string): Promise<IUser & { id?: String } | null> => (await User.findOne({ name: name }).exec())?.toObject() ?? null,
}