// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new user
router.post('/', async (req, res) => {
  const { username, email } = req.body;
  try {
    const user = new User({ username, email });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET a specific user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// PUT/update a user
router.put('/:id', getUser, async (req, res) => {
  const { username, email } = req.body;
  if (username != null) {
    res.user.username = username;
  }
  if (email != null) {
    res.user.email = email;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH/update a user
router.patch('/:id', getUser, async (req, res) => {
  const { username, email } = req.body;
  if (username != null) {
    res.user.username = username;
  }
  if (email != null) {
    res.user.email = email;
  }
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
}

module.exports = router;
