const express = require('express');
<<<<<<< HEAD
const OrdersService = require('./../services/order.service.js');

const router = express.Router();
const order = new OrdersService();

router.get('/', (req, res) => {
  const orders = order.find();
  res.json(orders);
});

// return the detail of a product with a id
/* router.get('/:id', (req, res, next) => {
  // Get the id from the req
  // const { id } = req.params;
  // const product = await orders.findOne(id);
  // res.json(product);
}); */

// create post method
router.post('/', (req, res) => {
  const body = req.body;
  const newOrder = order.create(body);
  res.status(201).json(newOrder);
});

// patch method

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const patchOrder = order.update(id, body);
  res.json(patchOrder);
});

// delete method
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const deleteOrder = order.delete(id);
  res.json(deleteOrder);
});
=======

const OrderService = require('./../services/order.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
} = require('./../schemas/order.schema');

const router = express.Router();
const service = new OrderService();

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      // Get the id from the req
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      // execute a middleware error
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  }
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  }
);
>>>>>>> backend-postgres

module.exports = router;
