const comModel = require('../models/comments');

class comService {
    static async getComById(id) {
        if (!id) {
            throw new Error('id is required');
        }
        const com = await comModel.findOne({ _id: id });
        if (!com) {
            throw new Error('comment not found');
        }
        return com;

    };

    static async createCom(comData) {
        const { author, text, datetime } = comData;
        const newCom = new comModel({
            author, text, datetime
        });
        await newCom.save();
        return newCom;
    }


    static async updateCom(id, updateData) {
        const com = await comModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!com) {
            throw new Error('comment not found');

        }
        return com;
    }

    static async deleteCom(id) {
        const com = await comModel.findByIdAndDelete(id);
        if (!com) {
            throw new Error('comment not found');
        }
        return com;
    }

};

module.exports = comService;