// express
const express = require('express');
const router = express.Router();

// require Tools
const articleControllers = require('../controllers/article')
const authorizeTools = require('../tools/authorization');
const generalTools = require('../tools/general');




// POST request to Create Article
router.post('/', articleControllers.createArticle);

// Post request to Upload Article Image
router.post('/uploadArticleImage', generalTools.uploadArticleImage.single('articleImage'), articleControllers.uploadArticleImage);


// PUT request to Update a Article
// router.put('/:id', articleControllers.updateArticle);

// GET request to Get My Article
router.get('/myArticles', articleControllers.myArticles);

// GET request to Get All Article
router.get('/allArticles', articleControllers.allArticles);

// GET request to Get Specific Article
router.get('/articles/:articleId', articleControllers.specificArticle);



module.exports = router;