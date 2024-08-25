const comService = require('../services/commets');
const express = require('express');
const jwt = require('jsonwebtoken');

const comRouter = express.Router();


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

comRouter.get('/:id', auth, async (req, res) => {
    const com = await comService.getComById(req.params.id);
    res.status(200).send(com);
});

comRouter.post('/', auth, async (req, res) => {
    const newCom = await comService.createCom(req.body);
    res.status(201).send(newCom);
});


comRouter.delete('/:id', auth, async (req, res) => {
    await comService.deleteCom(req.params.id);
    res.status(204).send('comment deleted successfully');
});

module.exports = comRouter;