// requre Models
const User = require('../models/user');
const Article = require('../models/article');
// const Comment = require('../models/comment');


function accessController(roles) {
    return function (req, res, next) {
        if (!roles.include(req.session.user.role)) {
            return res.status(403).send('Access denid')
        }

        next();
    }
}

// const editAccessController = async (userId, articleId) => {
//     return function (req, res, next) {
//         const authorId = await Article.findById(articleId);
//         console.log(authorId);
        
//         if (userId !== authorId) {
//             let editAccess = false;
//             return next();
//         }
//         editAccess = true;
//         return next();
//     }
// }

module.exports = {
    accessController,
    // editAccessController
}