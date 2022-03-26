const {
    join
} = require('path');

const multer = require('multer');

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, '../public/images/avatars'));
    },
    filename: function (req, file, cb) {
        // cb(null, Date.now() + '_' + file.originalname);
        let extension = file.originalname.split(".").pop();
        cb(null, req.session.user.username + '_avatar.' + extension);

    }
})
const uploadAvatar = multer({
    storage: avatarStorage,

    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            return cb('Invalid file type', false);
        }

        cb(null, true);
    }
})



const articleImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, `../public/articles/${req.session.user._id}`));
    },
    filename: function (req, file, cb) {

        let articleId = req.params.articleId;

        if (articleId) {
            return cb(null, articleId + '.png');

        }

        // let extension = file.originalname.split(".").pop();
        // cb(null, req.session.user.username + `_` + 'tempImage' + '.' + extension);
        return cb(null, req.session.user.username + '_tempImage.png'); 




    }
})
const uploadArticleImage = multer({
    storage: articleImageStorage,

    fileFilter: function (req, file, cb) {
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
            return cb('Invalid file type', false);
        }

        cb(null, true);
    }
})




// function for get id of article
let getDocId = function (doc) {
    return new Promise((resolve, reject) => {
        doc.save(function (err, doc) {
            if (err) {
                return reject(err);
            }
            return resolve(doc.id);
        })
    });
}


// function for Purification Request Body
function bodyPurification(fieldsNameArray, body) {
    let myBody = {};

    for (const field of fieldsNameArray) {
        // let existField = body.find(el => el.field === field)
        if (body.field) {
            myBody.field = body.field;
        } else {
            continue;
        }
    }

    return myBody;
}

module.exports = {
    uploadAvatar,
    uploadArticleImage,
    getDocId,
    bodyPurification,
}