const {
    join
} = require('path');

const multer = require('multer');

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, join(__dirname, '../public/images/avatar'));
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

module.exports = {
    uploadAvatar,
}