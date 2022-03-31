const User = require('../models/user');
const bcrypt = require('bcrypt');
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


/*-------------------------------------------------------------------------------*/
/*----------------------------------- Register ----------------------------------*/
/*-------------------------------------------------------------------------------*/

// Controller of GET request to render register page
const register_get = (req, res) => {
    res.render('register', {
        msg: null
    })
};

//  Controller of POST request to register new user
const register_post = async (req, res) => {

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

            return res.json({
                success: true,
                msg: "User created successfully"
            });

            // res.redirect('/auth/login');

        } catch (err) {
            res.status(500).json(err);
        }
    }
};




/*-------------------------------------------------------------------------------*/
/*----------------------------------- Login ----------------------------------*/
/*-------------------------------------------------------------------------------*/

// Controller of GET request to render login page
const login_get = (req, res) => {
    res.render('login', {
        msg: null
    })
};

// Controller of POST request to login user
const login_post = async (req, res) => {
    try {

        // Check that the inputs are not empty
        if (!req.body.username || !req.body.password) {
            // return res.status(406).json({
            //     success: false,
            //     msg: 'Not Acceptable'
            // });

            return res.status(406).render('login', {
                msg: 'Input can not empty'
            })
        };

        const registeredUser = await User.findOne({
            username: req.body.username
        });

        // Check the existence of the user
        if (!registeredUser) {
            // return res.json({
            //     success: false,
            //     msg: 'User not found'
            // })

            return res.status(404).render('login', {
                msg: 'User not found'
            })
        }

        // Compare the password entered with the password stored in the database 
        bcrypt.compare(req.body.password, registeredUser.password)
            .then(function (result) {
                if (!result) {
                    // return res.status(401).json({
                    //     success: false,
                    //     msg: 'Username or Password is incorrect'
                    // })

                    return res.status(401).render('login', {
                        msg: 'Username or Password is incorrect'
                    })
                }

                // Set Session
                req.session.user = registeredUser;

                // If the role of the logged in user is admin
                if (registeredUser.role === 'admin') {
                    return res.redirect('/admin/dashboard');
                }

                // If the role of the logged in user is blogger
                res.redirect('/user/dashboard');


            })

    } catch (err) {
        res.json({
            err: err
        })
    }

};

/*---------------------------- Logout Controller ----------------------------*/
const logout = (req, res) => {
    res.clearCookie('user_sid')
    req.session.destroy();
    // return res.json({
    //     success: true,
    //     msg: 'You have logged out of your account'
    // })
    return res.redirect('/');
}

module.exports = {
    createAdmin,
    register_get,
    register_post,
    login_get,
    login_post,
    logout
}