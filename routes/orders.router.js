const express = require('express');
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
/* router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const order = order.update(id, body);
  res.json(order);
}); */

// delete method
router.delete('/:id', (req, res) => {
  const {id} = req.params;
  const deleteOrder = order.delete(id);
  res.json(deleteOrder);
});

module.exports = router;
