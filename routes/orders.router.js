const express = require('express');

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

module.exports = router;
