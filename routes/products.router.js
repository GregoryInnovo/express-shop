const express = require('express');

const ProductsService = require('./../services/product.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
} = require('./../schemas/product.schema');

// call the route init
const router = express.Router();
const service = new ProductsService();

router.get(
  '/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.json(products);
    } catch (error) {
      next(error);
    }
  }
);

// all that is specific NEED TO BE BEFORE a dynamic link
router.get('/filter', (req, res) => {
  res.send('Soy un filter');
});

// return the detail of a product with a id
router.get(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      // Get the id from the req
      const { id } = req.params;
      const product = await service.findOne(id);
      res.json(product);
    } catch (error) {
      // execute a middleware error
      next(error);
    }
  }
);

// create post method
router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  }
);

// patch method
router.patch(
  '/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const product = await service.update(id, body);
      res.json(product);
    } catch (err) {
      next(error);
    }
  }
);

// delete method
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const product = await service.delete(id);
  res.json(product);
});

module.exports = router;
