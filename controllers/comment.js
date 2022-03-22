const mongoose = require('mongoose');

// require Models
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');


// require Genetal Tools
const generalTools = require('../tools/general')


// Create Commet Controller
const createComment = async (req, res) => {

    try {

        const newComment = {
            content: req.body.content,
            articleId: req.body.articleId
        }

        // let targetArticle = await Article.findById(newComment.articleId);

        // if (!targetArticle) {
        //     return res.status(400).json({
        //         success: false,
        //         msg: 'This Article not exists'
        //     });
        // }


        const saveComment = await new Comment({
            content: newComment.content,
            article: newComment.articleId,
            author: req.session.user._id
        });

        return res.json({
            success: true,
            data: saveComment
        });

    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createComment,
}