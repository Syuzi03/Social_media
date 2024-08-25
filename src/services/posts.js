const postsModel = require('../models/posts');

class PostsService {
    static async getPostById(id) {
        if (!id) {
            throw new Error('id is required');
        }
        const post = await postsModel.findOne({ _id: id });
        if (!post) {
            throw new Error('post not found');
        }
        return post;

    };

    static async createPost(postData) {
        const { content, image, author, likes = 0, comments = [], created = new Date() } = postData;
        const newPost = new postsModel({
            content,
            image,
            author,
            likes,
            comments,
            created
        });
        await newPost.save();
        return newPost;
    }


    static async updatePost(id, updateData) {
        const post = await postsModel.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!post) {
            throw new Error('post not found');

        }
        return post;
    }

    static async deletePost(id) {
        const post = await postsModel.findByIdAndDelete(id);
        if (!post) {
            throw new Error('post not found');
        }
        return post;
    }

};

module.exports = PostsService;