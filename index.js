const express = require('express');
const routerApi = require('./routes');
// create app
const app = express();
// the port to run
const port = 3000;

// middleware
app.use(express.json());

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

routerApi(app);

// the app need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
