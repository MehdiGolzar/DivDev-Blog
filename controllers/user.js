// require Model
const User = require('../models/user');


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

        // const updateResult = await User.updateOne({
        //         username: req.session.user.username
        //     },
        //     updatedFields
        // );


        // if (updateResult.acknowledged === true && updateResult.matchedCount === 1 && updateResult.modifiedCount >= 1) {
        //     return res.json({
        //         success: true,
        //         msg: 'Your profile has been successfully updated'
        //     });
        // }

        // return res.status(400).json({
        //     success: false,
        //     msg: 'Update failed'
        // });

        if (Object.keys(updatedFields).length > 0) {
            await User.findByIdAndUpdate(targetUserId, updatedFields);
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

/*---------------------------- Delete User Controller ----------------------------*/
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


module.exports = {
    dashboard,
    profile,
    update,
    uploadAvatar,
    Delete,
}