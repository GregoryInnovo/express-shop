// config the routes

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  app.use('/products', productsRouter);
  app.use('/categories', categoriesRouter);
  app.use('/users', usersRouter);
  app.use('/orders', ordersRouter);
}

module.exports = routerApi;
