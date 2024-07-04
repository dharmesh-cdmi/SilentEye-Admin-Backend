const express = require('express');
const router = express.Router();

// Mock data (replace with MongoDB integration later)
let users = [
  { id: 1, name: 'uday gupta', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
];

// GET /api/users
router.get('/', (req, res) => {
  res.json(users);
});

// POST /api/users
router.post('/', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    email: req.body.email
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
