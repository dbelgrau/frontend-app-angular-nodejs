const express = require('express');
const router = express.Router();
const uuid = require('uuid');

const authenticateMiddleware = require('../middleware/authenticate');
const userOwnershipMiddleware = require('../middleware/userOwnership')

let users = [];

// some spaghetti code, idk
module.exports = (usersArray) => {
  users = usersArray;

  // get all
router.get('/', (req, res) => {
  console.log("GET users");
  res.json(users);
});

// get single
router.get('/:id', (req, res) => {
  const userId = req.params.id;
  console.log("GET user", userId);

  const user = users.find(user => user.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
});

// add
router.post('/', (req, res) => {
  console.log("POST user");

  const newUser = req.body;
  newUser.id = uuid.v4();

  users.push(newUser);
  res.status(201).json(newUser);
});

// update
router.put('/:id', [userOwnershipMiddleware()], (req, res) => {
  const userId = req.params.id;
  console.log("PUT user", userId);


  const updatedUser = req.body;
  const existingUserIndex = users.findIndex(user => user.id === userId);

  if (existingUserIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[existingUserIndex] = { ...users[existingUserIndex], ...updatedUser };
  res.json(users[existingUserIndex]);
});

// remove
router.delete('/:id', [userOwnershipMiddleware()], (req, res) => {
  const userId = req.params.id;
  console.log("DELETE user", userId);

  const existingUserIndex = users.findIndex(user => user.id === userId);

  if (existingUserIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(existingUserIndex, 1)[0];
  res.json(deletedUser);
});

  return router;
};