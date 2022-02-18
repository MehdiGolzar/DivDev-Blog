const User = require('../models/user');

const panel = async (req, res) => {
    res.render('panel');
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
    panel,
    getUsers,
}