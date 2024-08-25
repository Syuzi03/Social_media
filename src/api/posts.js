const postsService = require('../services/posts');
const express = require('express');
const jwt = require('jsonwebtoken');

const postsRouter = express.Router();


const auth = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ message: 'authorization required' });
    };
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (e) {
        res.status(401).send({ error: 'invalid token' });
    }
};

postsRouter.get('/:id', auth, async (req, res) => {
    const post = await postsService.getPostById(req.params.id);
    res.status(200).send(post);
});

postsRouter.post('/', auth, async (req, res) => {
    const newPost = await postsService.createPost(req.body);
    res.status(201).send(newPost);
});

postsRouter.patch('/:id', auth, async (req, res) => {
    const updatedUser = await postsService.updatePost(req.params.id, req.body);
    res.status(200).send(updatedUser);

});

postsRouter.delete('/:id', auth, async (req, res) => {
    await postsService.deletePost(req.params.id);
    res.status(204).send('post deleted successfully');

});

module.exports = postsRouter;