//#region imports, who cares
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const postsController = require('./controllers/posts');
const usersController = require('./controllers/users');
const authController = require('./controllers/auth');

const authenticateMiddleware = require('./middleware/authenticate');
const postOwnershipMiddleware = require('./middleware/postOwnership');
const userOwnershipMiddleware = require('./middleware/userOwnership');

const sampleData = require('./data/data');
//#endregion

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use(cors());

const posts = [];
const users = [];
const logins = [];

posts.push(...sampleData.posts);
users.push(...sampleData.users);
logins.push(...sampleData.logins);

app.use('/api/posts', postsController(posts, users));
app.use('/api/users', usersController(users));
app.use('/api/auth', authController(users, logins));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});