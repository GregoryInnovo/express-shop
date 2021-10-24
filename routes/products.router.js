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
  if (id == '999') {
    res.status(404).json({
      message: 'NOT FOUND'
    });
  } else {
    res.status(200).json({
      id,
      name: 'Product 2',
      price: 2000,
    });
  }
});

// create post method
router.post('/', (req, res) => {
  const body = req.body;

  res.status(201).json({
    message: 'created',
    data: body
  });
});

// patch method
router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;

  res.json({
    message: 'update',
    data: body,
    id
  });
});

// delete method
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  res.json({
    message: 'deleted',
    id
  });
});

module.exports = router;
