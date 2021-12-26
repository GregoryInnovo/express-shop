const jwt = require('jsonwebtoken');

const secret = 'Example';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoiY3VzdG9tZXIiLCJpYXQiOjE2NDA0ODE2MjV9.0qOqTJYjTk6fPUko9wqoQ0TUzmHvtmOFmnHsbqUR5x4';

function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);
