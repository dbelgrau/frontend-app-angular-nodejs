const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let logins = []; 

let users = []; 

// some spaghetti code, idk
module.exports = (usersArray, loginsArray) => {
  users = usersArray;
  logins = loginsArray;

// register
router.post('/register', async (req, res) => {
  console.log("POST register");

  try {
    const { email, password } = req.body;

    if (logins.some(data => data.email === email)) {
      return res.status(409).json({ message: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = { id: uuid.v4(), name: "new user", role: "USER", age: "18" };
    users.push(newUser);

    logins.push({ userId: newUser.id, email, password: hashedPassword });

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// login
router.post('/login', async (req, res) => {
  console.log("POST login");

  try {
    const { email, password } = req.body;

    const authInfo = logins.find(data => data.email === email);

    if (!authInfo) {
      return res.status(401).json({ message: 'Invalid email' });
    }

    const passwordMatch = await bcrypt.compare(password, authInfo.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const user = users.find(u => u.id === authInfo.userId);
    const token = jwt.sign({ userId: authInfo.userId, userRole: user.role }, 'secret_key', { expiresIn: '1h' });

    res.json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

  return router;
};
