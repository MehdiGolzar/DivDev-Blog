const User = require('../models/user');


const dashboard = async (req, res) => {

    res.render('adminDashboard', {
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        avatar: req.session.user.avatar,
    });

    // res.json({msg: 'Logged in'});
}

const profile = async (req, res) => {

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

    // res.json({msg: 'Logged in'});
}


const getUsers = async (req, res) => {

    const usersList = await User.find({});
    console.log(usersList);
    if (!usersList) {
        return res.status(500).send('Internal server error');
    }

    res.json({
        success: true,
        data: usersList
    });
}

module.exports = {
    dashboard,
    profile,
    getUsers,
}