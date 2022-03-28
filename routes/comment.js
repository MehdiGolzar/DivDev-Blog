// express
const express = require('express');
const router = express.Router();

// require Tools
const commentControllers = require('../controllers/comment')
const authorizeTools = require('../tools/authorization');
const generalTools = require('../tools/general');




// POST request to Create Comment
router.post('/', commentControllers.createComment);


// DELETE requset to Delete Specific Comment
router.delete('/:commentId', commentControllers.deleteComment)



module.exports = router;