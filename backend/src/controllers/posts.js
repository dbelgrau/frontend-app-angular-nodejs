const uuid = require('uuid');

const express = require('express');
const router = express.Router();

const authenticateMiddleware = require('../middleware/authenticate');
const postOwnershipMiddleware = require('../middleware/postOwnership');


let posts = [];
let users = [];

// some spaghetti code, idk
module.exports = (postsArray, usersArray) => {
  users = usersArray;
  posts = postsArray;

// get all
router.get('/', (req, res) => {
  console.log("GET posts");
  res.json(posts);
});

// get single
router.get('/:id', (req, res) => {
  const postId = req.params.id;
  console.log("GET post", postId);

  const post = posts.find(post => post.id === postId);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
});

// add
router.post('/', authenticateMiddleware(users), (req, res) => {
  console.log("POST post");

  const newPost = req.body;
  newPost.id = uuid.v4();

  posts.push(newPost);
  res.status(201).json(newPost);
});

// update
router.put('/:id', [postOwnershipMiddleware(posts)], (req, res) => {
  const postId = req.params.id;
  console.log("PUT post", postId);

  const updatedPost = req.body;
  const existingPostIndex = posts.findIndex(post => post.id === postId);

  if (existingPostIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  posts[existingPostIndex] = { ...posts[existingPostIndex], ...updatedPost };
  res.json(posts[existingPostIndex]);
});

// remove
router.delete('/:id', [postOwnershipMiddleware(posts)], (req, res) => {
  const postId = req.params.id;
  console.log("DELETE post", postId);
  
  const existingPostIndex = posts.findIndex(post => post.id === postId);

  if (existingPostIndex === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const deletedPost = posts.splice(existingPostIndex, 1)[0];
  res.json(deletedPost);
});

  return router;
}
