// require Models
const User = require('../models/user');
const Article = require('../models/article');

const {
    writeFile,
    mkdir,
    access
} = require('fs/promises');
const {
    join
} = require('path');




// Get All Article Controller
let allArticle = async function (req, res) {

    try {
        let allArticle = await Article.find({}).populate('author', {
            firstName: 1,
            lastName: 1,
            avatar: 1
        });

        if (!allArticle) {
            return res.status(404).json({
                success: false,
                msg: "There is no article"
            });
        }

        let sendToUser = [];

        allArticle.forEach((article) => {
            let summary = article.text.slice(0, 150);
            let createdAt = article.createdAt.toString().slice(0, 16);
            sendToUser.push({
                title: article.title,
                text: article.text,
                summary: summary,
                author: article.author.firstName + ' ' + article.author.lastName,
                avatar: article.author.avatar,
                createdAt: createdAt
            });
        });


        // return res.json({
        //     success: true,
        //     msg: `You have ${allArticle.length} Article`,
        //     data: sendToUser
        // })

        return res.render('articles', {
            articles: sendToUser
        });

    } catch (err) {
        return res.status(400).json({
            sucess: false,
            msg: err
        })
    }
}


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

        if (req.session.user.role === 'blogger') {
            return res.redirect('/user/dashboard');
        }
        return res.redirect('/admin/dashboard');


    } catch (err) {
        console.log(err);
        return res.status(400).json(err)
    }



    // try {

    //     console.log(req.body);

    //     let newArticle = await new Article({
    //         title: req.body.title,
    //         text: req.body.text,
    //         author: req.session.user._id
    //     }).save();


    //     newArticle = newArticle.toObject();

    //     let {
    //         __v,
    //         ...result
    //     } = newArticle

    //     res.json(result);

    // } catch (err) {
    //     res.status(400).json({
    //         sucess: false,
    //         msg: err
    //     });
    // }

}


// Get My Article Controller
let myArticles = async function (req, res) {

    try {
        let myArticles = await Article.find({
            user: req.session.user._id
        });

        if (!myArticles) {
            return res.status(404).json({
                success: false,
                msg: "You have no articles"
            });
        }

        let showToUser = [];
        myArticles.forEach((article) => {
            showToUser.push({
                title: article.title,
                text: article.text
            });
        });

        console.log(myArticles);
        return res.json({
            success: true,
            msg: `You have ${myArticles.length} Article`,
            data: showToUser
        })

    } catch (err) {
        return res.status(400).json({
            sucess: false,
            msg: err
        })
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






module.exports = {
    allArticle,
    createArticle,
    myArticles,
    // updateArticle,

}