const express = require('express');
const router = express.Router();

// params with a query
router.get('/', (req, res) => {
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

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  res.json({
    userId,
    name: 'Default',
    email: 'default@example.com',
  });
});

module.exports = router;
