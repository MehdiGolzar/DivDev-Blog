const User = require('../models/user');

const update = async (req, res) => {
    const updatedFields = {}

    console.log('req.body', req.body);

    try {

        if (req.body.firstName !== '' && req.body.firstName !== req.session.user.firstName) {
            updatedFields.firstName = req.body.firstName;
        }

        if (req.body.lastName !== '' && req.body.lastName !== req.session.user.lastName) {
            updatedFields.lastName = req.body.lastName;
        }

        if (req.body.email !== '' && req.body.email !== req.session.user.email) {
            updatedFields.email = req.body.email;
        }

        if (req.body.phoneNumber !== '' && req.body.phoneNumber !== req.session.user.phoneNumber) {
            updatedFields.phoneNumber = req.body.phoneNumber;
        }
        console.log('Updated Fields', updatedFields);

        // const filter = await User.find({
        //     username: req.session.user.username
        // });

        // if (!targetUser) {
        //     return res.staus(500).send('Internal server error')
        // }
        // console.log(targetUser);
        const updateResult = await User.updateOne({
                username: req.session.user.username
            },
            updatedFields
        );

        console.log('Update Result', updateResult);
        res.json({
            success: true,
            msg: 'User updated successfully'
        });
    } catch (err) {
        console.log('Error', err);
    }

};

const Delete = async (req, res) => {
    // const targetUser = req.session.user.username;

    try {
        const deletedUser = await User.findByIdAndDelete(req.session.user._id);

        if (!deletedUser) {
            return res.status(500).send('Internal server error')
        }
        res.clearCookie('user_sid')
        res.redirect('/auth/register');

    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    update,
    Delete,
}