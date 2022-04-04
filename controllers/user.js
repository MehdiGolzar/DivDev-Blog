const {
    rm,
    access,
    unlink
} = require('fs/promises');
const {
    join
} = require('path')
// require Model
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');



/*-------------------------------------------------------------------------------*/
/*---------------------------- Dashboard Controllers ----------------------------*/
/*-------------------------------------------------------------------------------*/
const dashboard = async (req, res) => {

    res.render('userDashboard', {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        avatar: req.session.user.avatar,
        role: req.session.user.role
    });

    // res.json({msg: 'Logged in'});
}

/*-------------------------------------------------------------------------------*/
/*----------------------------- Profile Controllers -----------------------------*/
/*-------------------------------------------------------------------------------*/

/*-----------------------  Render Profile Page Controller -----------------------*/
const profile = (req, res) => {

    res.render('profile', {
        username: req.session.user.username,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        phoneNumber: req.session.user.phoneNumber,
        gender: req.session.user.gender,
        avatar: req.session.user.avatar,
        id: req.session.user._id,
        msg: null
    });
}

/*-------------------------- Update Profile Controller --------------------------*/
const update = async (req, res) => {

    try {
        const updatedFields = {};
        const targetUserId = req.body.id;

        if (req.body.firstName !== ' ' && req.body.firstName !== req.session.user.firstName) {
            updatedFields.firstName = req.body.firstName;
        } else if (req.body.lastName !== ' ' && req.body.lastName !== req.session.user.lastName) {
            updatedFields.lastName = req.body.lastName;
        } else if (req.body.email !== ' ' && req.body.email !== req.session.user.email) {
            updatedFields.email = req.body.email;
        } else if (req.body.phoneNumber !== ' ' && req.body.phoneNumber !== req.session.user.phoneNumber) {
            updatedFields.phoneNumber = req.body.phoneNumber;
        } else if (req.body.gender !== ' ' && req.body.gender !== req.session.user.gender) {
            updatedFields.gender = req.body.gender;
        }


        if (Object.keys(updatedFields).length > 0) {
            await User.findByIdAndUpdate(targetUserId, updatedFields);

            req.session.user.firstName = req.body.firstName
            req.session.user.lastName = req.body.lastName
            req.session.user.email = req.body.email
            req.session.user.phoneNumber = req.body.phoneNumber
            req.session.user.gender = req.body.gender

        }

        // return res.redirect('/user/profile');

        return res.json({
            success: true,
            msg: 'Your profile has been successfully updated'
        });

    } catch (err) {
        return res.status(400).send(err);
    }

};

/*--------------------------- Upload Avatar Controller --------------------------*/
const uploadAvatar = async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.session.user._id, {
            avatar: req.file.filename
        });

        req.session.user.avatar = req.file.filename;

        return res.json({
            success: true,
            msg: 'Avatar uploaded'
        });

        // res.redirect('/user/userDashboard');

    } catch (err) {
        res.status(400).send(err)
    }
}

/*---------------------------- Delete User Controller ----------------------------*/
const Delete = async (req, res) => {

    try {
        const userId = req.session.user._id;

        // Delete deleted user comments
        await Comment.deleteMany({
            author: userId
        });

        // Delete deleted user articles comments
        const articles = await Article.find({
            author: userId
        });

        if (articles) {
            // Delete comments of each article
            articles.forEach(async function (article) {
                await Comment.deleteMany({
                    article: article._id
                });
            });

            // Delete deleted user articles
            await Article.deleteMany({
                author: userId
            });

            // Delete articles in file system
            await rm(join(__dirname, `../public/articles/${userId}`), {
                recursive: true,
                force: true
            });
        }

        // Find username of user for delete avatar
        const targetUser = await User.findOne({
            _id: userId
        }, {
            username: 1
        }).lean();


        const userAvatarPath = join(__dirname, `../public/images/avatars/${targetUser.username}_avatar.jpg`);
        await access(userAvatarPath)
            .then(async () => {
                // Delete user avatar in file system
                await unlink(userAvatarPath);

            })
            .catch((err) => {
                console.log('User has not avatar');
            })


        // Delete user
        await User.findByIdAndDelete(userId);

        return res.json({
            success: true,
            msg: 'User deleted successfully'
        });

    } catch (err) {
        return res.status(400).send(err);
    }
}


module.exports = {
    dashboard,
    profile,
    update,
    uploadAvatar,
    Delete,
}