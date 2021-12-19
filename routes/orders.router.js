const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([
    {
      name: 'Order 1',
      amount: 4,
      totalPrice: 1000,
    },
  ]);
});

module.exports = router;
