const express = require("express");
const router = express.Router();

// require Model
const User = require('../models/user');

// require Controllers
const userControllers = require('../controllers/user');
const authControllers = require('../controllers/authentication');

// require Tools
const authTools = require('../tools/authentication');
const generalTools = require('../tools/general');


/*---------------------------- Dashboard ----------------------------*/
router.get("/dashboard", authTools.sessionChecker_login, userControllers.dashboard);
















router.put('/update', userControllers.update);

// Post request to upload Avatar
router.post('/uploadAvatar', (req, res) => {
    const uploadAvatar = generalTools.uploadAvatar.single('avatar');

    uploadAvatar(req, res, (err) => {
        if (err) {
            return res.status(500).json({msg: err})
        }

        User.findByIdAndUpdate(req.session.user._id, {avatar: req.file.filename}, (err, user) => {
            if (err) {
                return res.status(500). json({msg: err});
            }

            res.json({msg: 'Avatar uploaded'});
            // res.redirect('/auth/dashboard');
        })
    })
});

router.get('/delete', userControllers.Delete);


module.exports = router;