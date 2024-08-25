const usersService = require('../services/users');
const express = require('express');
const jwt = require('jsonwebtoken');

const usersRouter = express.Router();


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

usersRouter.get('/:id', auth, async (req, res) => {
    const user = await usersService.getUserById(req.params.id);
    res.status(200).send(user);
});


usersRouter.patch('/:id', auth, async (req, res) => {
    const updatedUser = await usersService.updateUser(req.params.id, req.body);
    res.status(200).send(updatedUser);

});

usersRouter.delete('/:id', auth, async (req, res) => {
    await usersService.deleteUser(req.params.id);
    res.status(204).send('user deleted successfully');

});

module.exports = usersRouter;