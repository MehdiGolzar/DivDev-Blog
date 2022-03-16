// require Core Modules
const {
    writeFile,
    mkdir,
    access,
    readFile,
    rename
} = require('fs/promises');
const {
    join
} = require('path');

const mongoose = require('mongoose');

// require Models
const User = require('../models/user');
const Article = require('../models/article');

// require Genetal Tools
const generalTools = require('../tools/general')



// Create Article Controller
const createArticle = async function (req, res) {

    try {
        const newArticle = {
            title: req.body.articleTitle,
            // content: req.body.articleContent.replace(/(<([^>]+)>)/gi, ""),
            content: req.body.articleContent,
            summary: req.body.articleContent.slice(0, 150).replace(/(<([^>]+)>)/gi, ""),
        }

        const savedAricle = await new Article({
            title: newArticle.title,
            summary: newArticle.summary,
            author: req.session.user._id
        })

        await access(join(__dirname, `../public/articles/${req.session.user._id}`))
            .then(() => true)
            .catch(() => mkdir(join(__dirname, `../public/articles/${req.session.user._id}`)));

        // Store id of saved Article for name of article
        const articleId = await generalTools.getDocId(savedAricle);
        const articlePath = join(__dirname, `../public/articles/${req.session.user._id}/${articleId}`) + '.html';

        // Create a HTML file whit Article content
        await writeFile(articlePath, newArticle.content);

        // Article Image
        await access(join(__dirname, `../public/articles/${req.session.user._id}/${req.session.user.username}_tempImage.png`))
            .then(() => rename(join(__dirname, `../public/articles/${req.session.user._id}/${req.session.user.username}_tempImage.png`),
                join(__dirname, `../public/articles/${req.session.user._id}/${articleId}.png`)))
            .then(() => newArticle.image = `${req.session.user._id}/${articleId}.png`)
            .catch(() => newArticle.image = 'article_default_image.png');

        // Update Article to add src and imgae property
        await Article.findByIdAndUpdate(articleId, {
            src: `/articles/${req.session.user._id}/${articleId}.html`,
            image: newArticle.image
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


// Upload Article Image Controller
const uploadArticleImage = async function (req, res) {
    console.log(req.file);
    res.json({
        success: true,
        tempImageSrc: `/articles/${req.session.user._id}/${req.file.filename}`
    });
}

// Update Article Controller
let updateArticle = async function (req, res) {

    try {
        const targetArticleId = req.params.ArticleId;
        const targetArticle = await Article.find({id: targetArticleId}).populate('author');

    } catch (err) {
        return res.status(400).json({
            success: false,
            msg: err
        });
    }

}


// Get My Article Controller
const myArticles = async function (req, res) {

    try {
        let myArticles = await Article.find({
            author: mongoose.Types.ObjectId(req.session.user._id)
        }).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });


        if (!myArticles) {
            return res.status(404).json({
                success: false,
                msg: "You have no articles"
            });
        }

        let sendToUser = [];

        myArticles.forEach(async (article) => {
            const createdAt = article.createdAt.toString().slice(0, 16);
            sendToUser.push({
                id: article.id,
                title: article.title,
                src: article.src,
                summary: article.summary,
                image: article.image,
                createdAt: createdAt,
                author: {
                    firstName: article.author.firstName,
                    lastName: article.author.lastName,
                    avatar: article.author.avatar
                }
            });
        });


        // return res.json({
        //     success: true,
        //     msg: `You have ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('articlesList', {
            pageTitle: "My Articles",
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
const allArticles = async function (req, res) {

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
                id: article.id,
                title: article.title,
                src: article.src,
                summary: article.summary,
                image: article.image,
                createdAt: createdAt,
                author: {
                    firstName: article.author.firstName,
                    lastName: article.author.lastName,
                    avatar: article.author.avatar
                }
            });
        });


        // return res.json({
        //     success: true,
        //     msg: `There are ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('articlesList', {
            pageTitle: "All Articles",
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


// Get Specific Article Controller
const specificArticle = async function (req, res) {

    try {
        
        const articleId = req.params.articleId;

        let targetArticle = await Article.findOne({
            _id: articleId
        }).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });

        if (!targetArticle) {
            return res.status(404).json({
                success: false,
                msg: "Article not exist"
            });
        }

        const articleContent = await readFile(join(__dirname, '../public', targetArticle.src), 'utf-8')
        const createdAt = targetArticle.createdAt.toString().slice(0, 16);

        const sendToUser = {
            title: targetArticle.title,
            // src: targetArticle.src,
            content: articleContent,
            summary: targetArticle.summary,
            image: targetArticle.image,
            createdAt: createdAt,
            author: {
                authorId: targetArticle.author._id,
                firstName: targetArticle.author.firstName,
                lastName: targetArticle.author.lastName,
                avatar: targetArticle.author.avatar
            }
        };

        // return res.json({
        //     success: true,
        //     msg: `You have ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('oneArticle', {
            pageTitle: sendToUser.title,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            // editAccess: editAccess,
            article: sendToUser
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
    uploadArticleImage,
    updateArticle,
    myArticles,
    allArticles,
    specificArticle

}