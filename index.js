const express = require('express');
// create app
const app = express();
// the port to run
const port = 3000;

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

// the ap need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
