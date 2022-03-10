// require Core Modules
const {
    writeFile,
    mkdir,
    access
} = require('fs/promises');
const {
    join
} = require('path');

const mongoose = require('mongoose');

// require Models
const User = require('../models/user');
const Article = require('../models/article');

// Create Article Controller
let createArticle = async function (req, res) {

    try {
        const newArticle = {
            title: req.body.articleTitle,
            content: req.body.articleContent.replace(/(<([^>]+)>)/gi, ""),
            summary: req.body.articleContent.slice(0, 150).replace(/(<([^>]+)>)/gi, "")
        }

        const savedAricle = await new Article({
            title: newArticle.title,
            summary: newArticle.summary,
            author: req.session.user._id
        })

        // function for get id of article
        let articleId = function (doc) {
            return new Promise((resolve, reject) => {
                doc.save(function (err, doc) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(doc.id);
                })
            });
        }

        await access(join(__dirname, `../public/articles/${req.session.user._id}`))
            .then(() => true)
            .catch(() => mkdir(join(__dirname, `../public/articles/${req.session.user._id}`)));

        // Store id of saved Article for name of article
        const id = await articleId(savedAricle);
        const articlePath = join(__dirname, `../public/articles/${req.session.user._id}/${id}`) + '.txt';

        await writeFile(articlePath, newArticle.content);

        await Article.findByIdAndUpdate(id, {
            src: `/articles/${req.session.user._id}/${id}.txt`
        });

        if (req.session.user.role === 'blogger') {
            return res.redirect('/user/dashboard');
        }
        return res.redirect('/admin/dashboard');

    } catch (err) {
        console.log(err);
        return res.status(400).json(err)
    }
}

// Update Article Controller
// let updateArticle = async function (req, res) {

//     try {
//         const targetArticle = await Article.find({}).populate('author');

//     } catch (err) {
//         return res.status(400).json({success: false, msg: err});
//     }

// }


// Get My Article Controller
let myArticles = async function (req, res) {

    try {
        let myArticles = await Article.find({author: mongoose.Types.ObjectId(req.session.user._id)}).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });;

        if (!myArticles) {
            return res.status(404).json({
                success: false,
                msg: "You have no articles"
            });
        }

        let sendToUser = [];

        myArticles.forEach((article) => {
            let createdAt = article.createdAt.toString().slice(0, 16);
            sendToUser.push({
                title: article.title,
                src: article.src,
                summary: article.summary,
                author: article.author,
                image: article.image,
                createdAt: createdAt
            });
        });

        // return res.json({
        //     success: true,
        //     msg: `You have ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('articles', {
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            articles: sendToUser
        });

    } catch (err) {
        return res.status(400).json({
            sucess: false,
            msg: err
        })
    }
}






// Get All Article Controller
let allArticles = async function (req, res) {

    try {
        let allArticle = await Article.find({}).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });

        if (!allArticle) {
            return res.status(404).json({
                success: false,
                msg: "There are no articles"
            });
        }

        let sendToUser = [];

        allArticle.forEach((article) => {
            let createdAt = article.createdAt.toString().slice(0, 16);
            sendToUser.push({
                title: article.title,
                src: article.src,
                summary: article.summary,
                author: article.author,
                image: article.image,
                createdAt: createdAt
            });
        });


        // return res.json({
        //     success: true,
        //     msg: `There are ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('articles', {
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            articles: sendToUser
        });

    } catch (err) {
        return res.status(400).json({
            sucess: false,
            msg: err
        })
    }


}


module.exports = {
    createArticle,
    // updateArticle,
    myArticles,
    allArticles,

}