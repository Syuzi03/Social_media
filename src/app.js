require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./api/users');
const postsRouter = require('./api/posts');
const comRouter = require('./api/comments');
const app = express();
mongoose.connect('mongodb://localhost:27017/social_media');
const Auth = require('./core/auth')

app.use(express.json())
const DEFAULT_PORT_VALUE = 3000
const PORT = process.env.PORT || DEFAULT_PORT_VALUE
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', comRouter);

app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    const newUser = await Auth.signUp({ email, username, password });
    res.status(201).send(newUser);
});

app.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const { token } = await Auth.signIn({ email, password });
    res.status(200).send({ token });
});


app.listen(PORT, () => {
    `Server is running on http://localhost:${PORT}`
});