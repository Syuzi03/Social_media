const usersModel = require('../models/users');


class UsersService {
    static async getUserById(id) {
        if (!id) {
            throw new Error('id is required');
        }
        const user = await usersModel.findOne({ _id: id });
        if (!user) {
            throw new Error('user not found');
        }
        return user;

    };

    static async updateUser(id, updateData) {
        const user = await usersModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!user) {
            throw new Error('user not found');

        }
        return user;
    }

    static async deleteUser(id) {
        const user = await usersModel.findByIdAndDelete(id);
        if (!user) {
            throw new Error('user not found');
        }
        return user;
    }

};

module.exports = UsersService;