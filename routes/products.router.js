const express = require('express');

const ProductsService = require('./../services/product.service');

// call the route init
const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  // Send a list of product
  res.json(products);
});

// all that is specific NEED TO BE BEFORE a dynamic link
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

// return the detail of a product with a id
router.get('/:id', async (req, res, next) => {
  try {
    // Get the id from the req
    const { id } = req.params;
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    // execute a middleware error
    next(error);
  }
});

// create post method
router.post('/', async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json(newProduct);
});

// patch method
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json(product);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// delete method
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await service.delete(id);
  res.json(product);
});

module.exports = router;
