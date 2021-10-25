const express = require('express');

const ProductsService = require('./../services/product.service');

// call the route init
const router = express.Router();
const service = new ProductsService();

router.get('/', (req, res) => {
  const products = service.find();
  // Send a list of product
  res.json(products);
});

// all that is specific NEED TO BE BEFORE a dynamic link
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
})

// return the detail of a product with a id
router.get('/:id', (req, res) => {
  // Get the id from the req
  const { id } = req.params;
  const product = service.findOne(id);
  res.json(product);
});

// create post method
router.post('/', (req, res) => {
  const body = req.body;
  const newProduct = service.create(body);
  res.status(201).json(newProduct);
});

// patch method
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body)
  res.json(product);
});

// delete method
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const product = service.delete(id)
  res.json(product);
});

module.exports = router;
