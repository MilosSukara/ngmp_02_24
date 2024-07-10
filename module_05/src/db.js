import { v4 as uuid } from 'uuid';

class User {

  constructor() {
    this.users = [];
  }

  all() {
    return this.users;
  }

  get(id) {
    return this.users.find(user => user.id === id);
  }

  create(user) {
    const newUser = {
      id: uuid(),
      ...user
    }
    this.users.push(newUser);
    return newUser;
  }

  update(id, newUser) {
    const user = this.get(id);
    if (user == undefined) {
      return undefined;
    }

    this.users = this.users.map(user => {
      if (user?.id === id) {
        return newUser;
      }
      return user;
    });

    return newUser;
  }

  delete(id) {
    const oldLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    const newLength = this.users.length;
    return oldLength !== newLength;
  }

}

export const db = {
  users: new User()
};