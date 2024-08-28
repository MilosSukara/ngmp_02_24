import express, { NextFunction, Request, Response } from 'express';
import { cartController } from './controller/cart.controller.js'
import { productController } from './controller/product.controller.js';
import { updateCartValidatior } from './controller/cart.validatior.js'
import { errorHandler, setJSONResponseHeader, userAuthorizationMiddleware } from './controller/middleware.js';

const app = express();
const port = 3000;
const profileRouter = express.Router();
const cartRouter = express.Router();
const productRouter = express.Router();


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