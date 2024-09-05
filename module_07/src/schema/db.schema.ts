import mongoose, { Schema, Document } from 'mongoose';
import { OrderEntity, CartEntity, ProductEntity, UserEntity } from './entity.schema'
import { v4 as uuid } from "uuid";

const transform = function (doc: any, ret: Record<string, any>) {
  ret = { id: ret._id.toString(), ...ret }
  delete ret._id;
  delete ret.__v;
  return ret;
}

const options = {
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform
  },
  toObject: {
    virtuals: true,
    versionKey: false,
    transform
  }
}

/**USER**/
export interface IUser extends Document, UserEntity {
  id: string,
  email: string,
  createdAt: Date,
  updatedAt: Date,
}
const UserSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  name: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, options);
export const User = mongoose.model<IUser>('User', UserSchema);

/**PRODUCT**/
export interface IProduct extends Document, ProductEntity {
  id: string,
  createAt: Date,
  updatedAt: Date,
}
const ProductSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true }
}, options);
export const Product = mongoose.model<IProduct>('Product', ProductSchema);


/**CART**/
export interface ICart extends Document, CartEntity {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}
const CartSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  isDeleted: { type: Boolean, required: true },
  userId: { type: String, ref: "User" },
  items: [{
    product: ProductSchema,
    count: { type: Number, required: true },
    _id: false
  }],
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, options);
export const Cart = mongoose.model<ICart>('Cart', CartSchema);

/**ORDER**/
export interface IOrder extends Document, OrderEntity {
  id: string,
  createdAt: Date,
  updatedAt: Date,
}
const OrderSchema: Schema = new Schema({
  _id: { type: String, default: uuid },
  userId: { type: String, ref: "User" },
  cartId: { type: String, ref: "Cart" },
  items: [{
    product: ProductSchema,
    count: { type: Number, required: true },
    _id: false
  }],
  payment: {
    type: { type: String, required: true },
    address: { type: String, required: true },
    creditCard: { type: String, required: true }
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true }
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
}, options);
export const Order = mongoose.model<IOrder>('Order', OrderSchema);