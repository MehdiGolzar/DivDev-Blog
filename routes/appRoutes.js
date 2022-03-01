const express = require("express");
const router = express.Router();

// require Routers
const authRouter = require('./authentication');
const adminRouter = require('./admin');
const userRouter = require('./user');

// require Tools
const authTools = require('../tools/authentication');

// require Model
const User = require('../models/user');

/*---------------------------- index page ----------------------------*/
// GET request to render index page
router.get("/", (req, res) => res.render('index'));

/*---------------------------- Auth Middleware ----------------------------*/
router.use('/auth', authRouter);

/*---------------------------- Admin Middleware ----------------------------*/
router.use('/admin', authTools.sessionChecker_login, adminRouter);

/*---------------------------- User Middleware ----------------------------*/
router.use('/user', authTools.sessionChecker_login, userRouter);





module.exports = router;