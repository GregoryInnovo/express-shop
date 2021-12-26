const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { checkApiKey } = require('./middlewares/auth.handler');

const {
  logErrors,
  ormErrorHandler,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
// create app
const app = express();
// the port to run
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());

// define a route, for the dir and cb for the response
app.get('/', (req, res) => {
  res.send('My first server in express');
});

app.get('/new-route', checkApiKey, (req, res) => {
  res.send('You can see this if you have the correct token');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

const whiteList = ['http://localhost:8080', 'https://my.app.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No access'));
    }
  },
};
// any domain can access cors()
app.use(cors(options));

require('./utils/auth');

// the app need to listen
app.listen(port, () => {
  console.log(`Listening in the port ${port}`);
});
