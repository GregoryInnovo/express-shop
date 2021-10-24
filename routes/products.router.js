const express = require('express');
const faker = require('faker');

// call the route init
const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const { size } = req.query;
  const limit = size || 10;
  for (let index = 0; index < limit; index++) {
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl(),
    })

  }
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
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

module.exports = router;
