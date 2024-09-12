import express from 'express';
import { cartController } from './controller/cart.controller'
import { productController } from './controller/product.controller';
import { updateCartValidatior } from './controller/cart.validatior'
import { errorHandler, setJSONResponseHeader, userAuthorizationMiddleware } from './controller/middleware';
import { logger, requestLogger } from './logger';
import { handleShutdown } from './shutdown';
import { indexController } from './controller/index.controller';

const app = express();
const port = process.env.PORT || 3000;
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

app.use(requestLogger);
app.use('/api/profile', userAuthorizationMiddleware, profileRouter);
app.use('/api/products', userAuthorizationMiddleware, productRouter);
app.use(setJSONResponseHeader);
app.use(errorHandler);
app.get('/health', indexController.health);
const server = app.listen(port, () => {
  logger.info(`Server is running on http://localhost:${port}`);
});

handleShutdown(server);