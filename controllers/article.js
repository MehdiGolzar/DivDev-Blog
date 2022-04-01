// require Core Modules
const {
    writeFile,
    mkdir,
    access,
    readFile,
    rename,
    unlink,
    rmdir
} = require('fs/promises');
const {
    join
} = require('path');

const mongoose = require('mongoose');

// require Models
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');


// require Tools
const generalTools = require('../tools/general')
const authorizeTools = require('../tools/authorization');


// Create Article Controller
const createArticle = async function (req, res) {

    try {
        const newArticle = {
            title: req.body.articleTitle,
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

        // if (req.session.user.role === 'blogger') {
        //     return res.redirect('/user/dashboard');
        // }
        // return res.redirect('/admin/dashboard');

        return res.json({
            success: true,
            msg: 'Article created successfully'
        })

    } catch (err) {
        console.log(err);
        return res.status(400).json(err)
    }
}


// Upload Article Image Controller
const uploadArticleImage = async function (req, res) {
    res.json({
        success: true,
        msg: `Image uploaded successfully`
    });
}

// Update Article Controller
let updateArticle = async function (req, res) {

    try {
        const targetArticleId = req.params.articleId;

        const updatedArticle = {
            title: req.body.updatedTitle,
            content: req.body.updatedContent,
            summary: req.body.updatedContent.slice(0, 150).replace(/(<([^>]+)>)/gi, ""),
        }

        const articlePath = join(__dirname, `../public/articles/${req.session.user._id}/${targetArticleId}`) + '.html';

        // Ower Write new Article Content 
        await writeFile(articlePath, updatedArticle.content);

        // Update in db
        await Article.findByIdAndUpdate(targetArticleId, {
            title: updatedArticle.title,
            summary: updatedArticle.summary,
            image: `${req.session.user._id}/${targetArticleId}.png`
        });


        // if (req.session.user.role === 'blogger') {
        //     return res.redirect('/user/dashboard');
        // }
        // return res.redirect('/admin/dashboard');

        return res.json({
            success: true,
            msg: 'redirect'
        })

    } catch (err) {
        // return res.status(400).json({
        //     success: false,
        //     msg: err
        // });

        return res.status(400).send(err)

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

        let dataSentToUser = [];

        myArticles.forEach(async (article) => {
            const createdAt = article.createdAt.toString().slice(0, 16);
            dataSentToUser.push({
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
        //     data: dataSentToUser
        // })

        return res.render('articlesList', {
            pageTitle: "My Articles",
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            articles: dataSentToUser,
            deleteArticleAccess: true
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

        let dataSentToUser = [];

        allArticle.forEach((article) => {
            let createdAt = article.createdAt.toString().slice(0, 16);
            dataSentToUser.push({
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

        const deleteArticleAccess = await authorizeTools.deleteArticleAccessController(req.session.user.role)

        // return res.json({
        //     success: true,
        //     msg: `There are ${allArticle.length} Article`,
        //     data: dataSentToUser
        // })

        return res.render('articlesList', {
            pageTitle: "All Articles",
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            articles: dataSentToUser,
            deleteArticleAccess: deleteArticleAccess
        });

    } catch (err) {
        return res.status(400).send(err);
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


        const targetArticleContent = await readFile(join(__dirname, '../public', targetArticle.src), 'utf-8')
        const targetArticleCreatedAt = targetArticle.createdAt.toString().slice(0, 16);

        let targetArticleComments = await Comment.find({
            article: targetArticle.id
        }, {
            content: 1,
            createdAt: 1
        }).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });


        let editArticleAccess = await authorizeTools.editArticleAccessController(req.session.user._id, targetArticle.author.id);
        let deleteCommentAccess = await authorizeTools.deleteCommentAccessController(req.session.user.role);

        // Convert comment id to string
        for (let comment of targetArticleComments) {
            comment._id = comment._id.toString()
        }

        // finaly article data that send to client
        const dataSentToUser = {
            id: targetArticle.id,
            title: targetArticle.title,
            content: targetArticleContent,
            summary: targetArticle.summary,
            image: targetArticle.image,
            createdAt: targetArticleCreatedAt,
            author: {
                authorId: targetArticle.author._id,
                firstName: targetArticle.author.firstName,
                lastName: targetArticle.author.lastName,
                avatar: targetArticle.author.avatar
            },
            comments: targetArticleComments
        };

        // return res.json({
        //     success: true,
        //     msg: `You have ${allArticle.length} Article`,
        //     data: dataSentToUser
        // })

        return res.render('oneArticle', {
            pageTitle: dataSentToUser.title,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            avatar: req.session.user.avatar,
            role: req.session.user.role,
            editArticleAccess: editArticleAccess,
            deleteCommentAccess: deleteCommentAccess,
            article: dataSentToUser
        });

    } catch (err) {
        return res.status(400).send(err)
    }
}


// Delete Article Controller
const deleteArticle = async function (req, res) {

    try {

        const articleId = req.params.articleId;

        const articleAuthor = await Article.findById(articleId, {author: 1}).lean();

        const articleAuthorId = articleAuthor.author._id.toString();

        const userArticlePath = join(__dirname, `../public/articles/${articleAuthorId}/${articleId}.html`);
        await access(userArticlePath)
            .then(async () => {
                // Delete user article in file system
                await unlink(userArticlePath);

            })
            .catch((err) => {
                console.log('Article file not exist');
            })


        const articleImagePath = join(__dirname, `../public/articles/${articleAuthorId}/${articleId}.png`);
        await access(articleImagePath)
            .then(async () => {
                // Delete article image in file system
                await unlink(articleImagePath);

            })
            .catch((err) => {
                console.log('Article image file not exist');
            })

        
            const articleDirPath = join(__dirname, `../public/articles/${articleAuthorId}`);
            await rmdir(articleDirPath);
                // .then(async () => {
                //     // Delete user articles folder in file system
                //     await unlink(articleDirPath);
    
                // })
                // .catch((err) => {
                //     console.log('Article folder not exist');
                // })    


        await Comment.deleteMany({
            article: articleId
        });

        await Article.findByIdAndDelete(articleId);

        res.json({
            success: true,
            msg: 'Article deleted successfully'
        });

    } catch (err) {
        res.status(400).send(err);
    }
}



module.exports = {
    createArticle,
    uploadArticleImage,
    updateArticle,
    myArticles,
    allArticles,
    specificArticle,
    deleteArticle

}