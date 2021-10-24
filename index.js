const express = require('express');
const faker = require('faker');
// create app
const app = express();
// the port to run
const port = 3000;

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

app.get('/products', (req, res) => {
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
app.get('/products/filter', (req, res) => {
  res.send('Soy un filter');
})

// return the detail of a product with a id
app.get('/products/:id', (req, res) => {
  // Get the id from the req
  const { id } = req.params;
  res.json({
    id,
    name: 'Product 2',
    price: 2000,
  });
});

/*
  Categories section
*/
// another depth
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

/*
  Orders section
*/

app.get('/orders', (req, res) => {
  res.json([
    {
      name: 'Order 1',
      amount: 4,
      totalPrice: 1000,
    }
  ]);
});

/*
  Users section
*/

// params with a query
app.get('/users', (req, res) => {
  const { limit, offset} = req.query;
  if(limit && offset) {
    res.json({
      limit,
      offset,
    });
  } else {
    res.send('No params')
  }

});

app.get('/users/:userId', (req, res) => {
  const { userId } = req.params;

  res.json({
    userId,
    name: 'Default',
    email: 'default@example.com',
  });
});

// the app need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
