// require core moduls
const {
    unlink,
    rm
} = require('fs/promises');
const {
    join
} = require('path');

// require Models
const User = require('../models/user');
const Article = require('../models/article');
const Comment = require('../models/comment');


/*-------------------------------------------------------------------------------*/
/* Dashboard Controllers */
/*-------------------------------------------------------------------------------*/
const dashboard = async (req, res) => {

    res.render('adminDashboard', {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        avatar: req.session.user.avatar,
        role: req.session.user.role
    });

    // res.json({msg: 'Logged in'});
}
/*-------------------------------------------------------------------------------*/
/* Profile Controllers */
/*-------------------------------------------------------------------------------*/

// Controller of GET request to  render dashaboard page
const profile = (req, res) => {

    res.render('profile', {
        username: req.session.user.username,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        phoneNumber: req.session.user.phoneNumber,
        gender: req.session.user.gender,
        avatar: req.session.user.avatar,
        msg: null
    });
}


// Update Profile Controller
const update = async (req, res) => {
    const updatedFields = {}

    try {

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

        // console.log('Updated Fields', updatedFields);

        const updateResult = await User.updateOne({
                username: req.session.user.username
            },
            updatedFields
        );

        // console.log('Update Result', updateResult);

        if (updateResult.acknowledged === true && updateResult.matchedCount === 1 && updateResult.modifiedCount >= 1) {
            return res.json({
                success: true,
                msg: 'Your profile has been successfully updated'
            });
        }

        return res.status(400).json({
            success: false,
            msg: 'Update failed'
        });


    } catch (err) {
        console.log('Error', err);
    }

};

// Upload Avatar Controller 
const uploadAvatar = (req, res) => {
    User.findByIdAndUpdate(req.session.user._id, {
        avatar: req.file.filename
    }, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                msg: 'Avatar could not be uploaded'
            });
        }

        req.session.user.avatar = req.file.filename;

        return res.json({
            success: true,
            msg: 'Avatar uploaded'
        });
        // res.redirect('/user/userDashboard');
    });
}

// Delete User Controller 
const Delete = async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.session.user._id);

        if (!deletedUser) {
            return res.status(500).send('Internal server error')
        }
        res.clearCookie('user_sid')
        // req.session.destroy();
        return res.json({
            success: true,
            msg: 'Your account has been successfully deleted'
        })
        // res.redirect('/auth/register');

    } catch (err) {
        console.log(err);
    }
}

/*-------------------------------------------------------------------------------*/
/////////////////////////////* Admin Operations Controllers *//////////////////////
/*-------------------------------------------------------------------------------*/
// Get list of users controller
const getUsers = async (req, res) => {

    const usersList = await User.find({
        role: 'blogger'
    }, {
        password: 0,
        role: 0
    });

    if (!usersList) {
        return res.json({
            success: false,
            msg: 'No users available'
        });
    }


    res.json({
        success: true,
        data: usersList
    });
}


const deleteUser = async (req, res) => {

    try {
        const userId = req.params.userId;

        // Delete deleted user comments
        await Comment.deleteMany({
            author: userId
        });

        // Delete deleted user articles comments
        const articlesId = await Article.find({
            author: userId
        }, {
            _id: 1
        });

        articlesId.forEach(async function (article) {
            await Comment.deleteMany({
                article: article._id
            })
        })

        // Delete deleted user articles
        await Article.deleteMany({
            author: userId
        });

        // Delete articles in file system
        await rm(join(__dirname, `../public/articles/${userId}`), {
            recursive: true,
            force: true
        });

        // Find username of user for delete avatar
        const targetUser = await User.findOne({
            _id: userId
        }, {
            username: 1
        }).lean();

        // Delete user avatar in file system
        await unlink(join(__dirname, `../public/images/avatars/${targetUser.username}_avatar.jpg`));

        // Delete user
        await User.findByIdAndDelete(userId);


        res.json({
            success: true,
            msg: 'User deleted successfully'
        })

    } catch (err) {
        return res.status(400).send(err)
    }
}


module.exports = {
    dashboard,
    profile,
    update,
    uploadAvatar,
    Delete,
    getUsers,
    deleteUser,
}