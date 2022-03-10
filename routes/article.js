// express
const express = require('express');
const router = express.Router();

// require Tools
const articleControllers = require('../controllers/article')
const authorizeTools = require('../tools/authorization');



// POST request to Create Article
router.post('/', articleControllers.createArticle);


// PUT request to Update a Article
// router.put('/:id', articleControllers.updateArticle);

// GET request to Get My Article
router.get('/myArticles', articleControllers.myArticles);

// GET request to Get All Article
router.get('/allArticles', articleControllers.allArticles);


module.exports = router;