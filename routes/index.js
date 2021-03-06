// config the routes, access of the endpoints
const express = require('express');

const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const ordersRouter = require('./orders.router');
const customersRouter = require('./customers.router');
const AuthRouter = require('./auth.router');
const ProfileRouter = require('./profile.router');

function routerApi(app) {
  const router = express.Router();
  // global path
  app.use('/api/v1', router);

  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/orders', ordersRouter);
  router.use('/customers', customersRouter);
  router.use('/auth', AuthRouter);
  router.use('/profile', ProfileRouter);
}

module.exports = routerApi;
