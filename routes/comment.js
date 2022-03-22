// express
const express = require('express');
const router = express.Router();

// require Tools
const commentControllers = require('../controllers/comment')
const authorizeTools = require('../tools/authorization');
const generalTools = require('../tools/general');




// POST request to Create Comment
router.post('/', commentControllers.createComment);

// // GET request to Get All Comment
// router.get('/allComments', commentControllers.allComments);

// // PUT request to Update Specific Comment
// router.put('/:CommentId', commentControllers.updateComment);

// // DELETE requset to Delete Specific Comment
// router.delete('/:CommentId', commentControllers.deleteComment)



module.exports = router;