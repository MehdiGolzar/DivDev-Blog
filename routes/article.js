// express
const express = require('express');
const router = express.Router();

// require Tools
const articleControllers = require('../controllers/article')
const authorizeTools = require('../tools/authorization');
const generalTools = require('../tools/general');




// POST request to Create Article
router.post('/', articleControllers.createArticle);

// POST request to Upload Article Image
router.post('/uploadArticleImage', generalTools.uploadArticleImage.single('articleImage'), articleControllers.uploadArticleImage);

// GET request to Get All Article
router.get('/allArticles', articleControllers.allArticles);

// GET request to Get My Article
router.get('/myArticles', articleControllers.myArticles);

// GET request to Get Specific Article
router.get('/:articleId', articleControllers.specificArticle);

// PUT request to Update Specific Article
router.put('/:articleId', articleControllers.updateArticle);

// POST request to Update Specific Article Image
router.post('/updateArticleImage/:articleId', generalTools.uploadArticleImage.single('articleImage'), articleControllers.uploadArticleImage);

// DELETE requset to Delete Specific Article
router.delete('/:articleId', articleControllers.deleteArticle)



module.exports = router;