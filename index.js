const express = require('express');
// create app
const app = express();
// the port to run
const port = 3000;

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

app.get('/products', (req, res) => {
  // Send a list of product
  res.json([
    {
      name: 'Product 1',
      price: 1000,
    },
    {
      name: 'Product 2',
      price: 2000,
    }
  ]);
});

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

app.get('/users', (req, res) => {
  res.send('This is the user section');
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
