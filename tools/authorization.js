// requre Models
const User = require('../models/user');
const Article = require('../models/article');
// const Comment = require('../models/comment');


function accessController(roles) {
    return function (req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Access denid')
        }

        next();
    }
}

const editArticleAccessController = async (userId, articleAuthorId) => {
    let editArticleAccess = false;
        if (userId === articleAuthorId) {
            return editArticleAccess = true;
        }
        return editArticleAccess;
}


const deleteCommentAccessController = async (userRole) => {
    let deleteCommentAccess = false;

        if ( userRole === 'admin') {
            return deleteCommentAccess = true;
        } 
        
    return deleteCommentAccess;
}

module.exports = {
    accessController,
    editArticleAccessController,
    deleteCommentAccessController
}