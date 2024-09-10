import express, { NextFunction, Request, Response } from 'express';
import { cartController } from './controller/cart.controller'
import { productController } from './controller/product.controller';
import { updateCartValidatior } from './controller/cart.validatior'
import { errorHandler, setJSONResponseHeader, userAuthorizationMiddleware } from './controller/middleware';
import { userController } from './controller/user.controller';
import { registerUserValidator } from './controller/user.validatior';

const app = express();
const port = 3000;
const profileRouter = express.Router();
const cartRouter = express.Router();
const productRouter = express.Router();
const userRouter = express.Router();


cartRouter.get('/', cartController.getCart);
cartRouter.put('/', [express.json(), updateCartValidatior], cartController.updateCart);
cartRouter.delete('/', cartController.deleteCart);
cartRouter.post('/', cartController.checkoutCart);
productRouter.get('/', productController.allProducts);
productRouter.get('/:productId', productController.getProduct);
profileRouter.use('/cart', cartRouter);
userRouter.use('/register', [express.json(), registerUserValidator], userController.register);
userRouter.use('/login', [express.json()], userController.login);

app.use('/api/profile', userAuthorizationMiddleware, profileRouter);
app.use('/api/products', userAuthorizationMiddleware, productRouter);
app.use('/api/auth/', userRouter);
app.use(setJSONResponseHeader);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});