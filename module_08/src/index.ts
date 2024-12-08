import express, { NextFunction, Request, Response } from 'express';
import { cartController } from './controller/cart.controller.js'
import { productController } from './controller/product.controller.js';
import { updateCartValidatior } from './controller/cart.validatior.js'
import { errorHandler, setJSONResponseHeader, userAuthorizationMiddleware } from './controller/middleware.js';
import { EntityManager, EntityRepository, MikroORM, PostgreSqlDriver, RequestContext } from '@mikro-orm/postgresql';
import config from "./mikro-orm.config.js";
import { User } from './entities/user.entity.js';
import { Product } from './entities/product.entity.js';
import { Cart } from './entities/cart.entity.js';
import { Order } from './entities/order.entity.js';

const app = express();
const port = 3000;
const profileRouter = express.Router();
const cartRouter = express.Router();
const productRouter = express.Router();



export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  users: EntityRepository<User>,
  products: EntityRepository<Product>,
  carts: EntityRepository<Cart>,
  orders: EntityRepository<Order>,
};


export const init = await (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(config);
  DI.em = DI.orm.em;
  DI.users = DI.orm.em.getRepository(User);
  DI.products = DI.orm.em.getRepository(Product);
  DI.carts = DI.orm.em.getRepository(Cart);
  DI.orders = DI.orm.em.getRepository(Order);


  app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
  cartRouter.get('/', cartController.getCart);
  cartRouter.put('/', [express.json(), updateCartValidatior], cartController.updateCart);
  cartRouter.delete('/', cartController.deleteCart);
  cartRouter.post('/', cartController.checkoutCart);
  productRouter.get('/', productController.allProducts);
  productRouter.get('/:productId', productController.getProduct);
  profileRouter.use('/cart', cartRouter);
  

  app.use('/api/profile', userAuthorizationMiddleware, profileRouter);
  app.use('/api/products', userAuthorizationMiddleware, productRouter);
  app.use(setJSONResponseHeader);
  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();
