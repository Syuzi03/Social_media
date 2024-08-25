const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usersModel = require('../models/users');

class Auth {

    static async signUp(userData) {
        const { email, username, password } = userData;
        if (!email || !username || !password) {
            throw new Error('Email, username, and password are required');
        }

        const existUser = await usersModel.findOne({ email });
        if (existUser) {
            throw new Error('user already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new usersModel({
            ...userData,
            password: hashedPassword,
        });

        await newUser.save();
        return newUser;
    };


    static async signIn(userData) {
        const { email, password } = userData;
        const user = await usersModel.findOne({ email });
        if (!user) {
            throw new Error('user not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Incorrect password');
        }

        const token = jwt.sign({ id: user._id }, 'secretKey', {
            expiresIn: '1h',
        });

        return { token };
    };
}
module.exports = Auth