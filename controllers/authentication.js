const User = require('../models/user');
const {
    validationResult
} = require('express-validator');


/*---------------------------- Admin Create Controller ----------------------------*/
// Controller of Post request to create Admin in first start
const createAdmin = async (req, res) => {
    try {

        const existAdmin = await User.findOne({
            role: 'admin'
        });

        if (existAdmin) {
            return res.status(404).send('404! Not Found')
        }

        User.create({
            username: req.body.username,
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            password: req.body.password,
            gender: req.body.gender,
            role: 'admin'
        });


        res.json({
            msg: 'Admin created Successfully'
        })

    } catch (err) {
        console.log('error', err);
    }
}

/*---------------------------- Register Controller ----------------------------*/
// Controller of GET request to render register page
const register_get = (req, res) => {
    res.render('register', {
        msg: null
    })
};

//  Controller of POST request to register new user
const register_post = async (req, res) => {

    // // check required field
    // if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.email ||!req.body.phoneNumber || !req.body.password || !req.body.confirmPassword || !req.body.gender) {
    // return res.status(406).json({msg: 'Not Acceptable'});
    //     return res.json({
    //         msg: 'All field is required'
    //     });
    // };

    // Check for validation errors
    const validationErrors = validationResult(req);
    console.log(validationErrors);
    if (!validationErrors.isEmpty()) {
        return res.json(
            validationErrors.mapped()
        );

    } else {

        try {
            const existUser = await User.findOne({
                username: req.body.username
            });

            if (existUser) {
                // return res.json({
                //     msg: "Username already exist"
                // });
                return res.render('register', {
                    msg: "Username already exist."
                })
            }

            await User.create({
                username: req.body.username,
                lastName: req.body.lastName,
                firstName: req.body.firstName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: req.body.password,
                gender: req.body.gender
            });

            // res.json({
            //     msg: "User successfully saved in database"
            // });

            res.redirect('/auth/login');

        } catch (err) {
            res.status(500).json(err);
        }
    }
};

/*---------------------------- Login Controller ----------------------------*/
// Controller of GET request to render login page
const login_get = (req, res) => {
    res.render('login', {
        css: 'login',
        title: 'Login'
    })
};

// Controller of POST request to login user
const login_post = async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(406).json({
                msg: 'Not Acceptable'
            });
        };

        const registeredUser = await User.findOne({
            username: req.body.username
        });

        if (!registeredUser) {
            // return res.render('login', {msg: 'Wrong username or password'})
            return res.json({
                msg: 'User not found'
            })
        }

        // const match = await bcrypt.compare(password, registeredUser.password);

        if (req.body.password === '12345678') {
            req.session.user = registeredUser;

            // res.json({
            //     msg: "Dashboard"
            // });

            res.redirect('/auth/dashboard');
        }
    } catch (err) {
        res.json(err)
    }


};

/*---------------------------- Dashboard Controller ----------------------------*/
// Controller of GET request to  render dashaboard page
const dashboard = (req, res) => {
    if (!req.session.user || !req.cookies.user_sid) {
        return res.redirect('/auth/login');
    };
    // console.log(req.session.user);
    res.render('dashboard', {
        username: req.session.user.username,
        firstName: req.session.user.firstName,
        lastName: req.session.user.lastName,
        email: req.session.user.email,
        phoneNumber: req.session.user.phoneNumber,
        gender: req.session.user.gender,
        msg: null
    });
}

/*---------------------------- Logout Controller ----------------------------*/
const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

module.exports = {
    createAdmin,
    register_get,
    register_post,
    login_get,
    login_post,
    dashboard,
    logout
}