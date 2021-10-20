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
  res.json({
    name: 'Product 1',
    price: 1000
  });
});

// the ap need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
