const express = require('express');
// create app
const app = express();
// the port to run
const port = 3000;

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

app.get('/new-route', (req, res) => {
  res.send('Im a new end point');
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

app.get('/profile', (req, res) => {
  res.send('This is the profile');
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

// another depth
app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
});

// the app need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
