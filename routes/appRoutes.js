const express = require("express");
const router = express.Router();

// require Routers
const authRouter = require('./authentication');
const adminRouter = require('./admin');
const userRouter = require('./user');
const articleRouter = require('./article');
const commentRouter = require('./comment');



// require Tools
const authTools = require('../tools/authentication');


/*---------------------------- index page ----------------------------*/
// GET request to render index page
router.get("/", (req, res) => res.render('home'));

/*---------------------------- Auth Middleware ----------------------------*/
router.use('/auth', authRouter);

/*---------------------------- Admin Middleware ----------------------------*/
router.use('/admin', authTools.sessionChecker_login, adminRouter);

/*---------------------------- User Middleware ----------------------------*/
router.use('/user', authTools.sessionChecker_login, userRouter);

/*---------------------------- Article Middleware ----------------------------*/
router.use('/article', authTools.sessionChecker_login, articleRouter);

/*---------------------------- Article Middleware ----------------------------*/
router.use('/comment', authTools.sessionChecker_login, commentRouter);



module.exports = router;