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
const authorizeTools = require('../tools/authorization');



/*---------------------------- index page ----------------------------*/
// GET request to render index page
router.get("/", (req, res) => res.render('index'));

/*---------------------------- Auth Middleware ----------------------------*/
router.use('/auth', authRouter);

/*---------------------------- Admin Middleware ----------------------------*/
router.use('/admin', authTools.sessionChecker_login, authorizeTools.accessController(['admin']), adminRouter);

/*---------------------------- User Middleware ----------------------------*/
router.use('/user', authTools.sessionChecker_login, authorizeTools.accessController(['blogger']), userRouter);

/*---------------------------- Article Middleware ----------------------------*/
router.use('/article', authTools.sessionChecker_login, articleRouter);

/*---------------------------- Article Middleware ----------------------------*/
router.use('/comment', authTools.sessionChecker_login, commentRouter);



module.exports = router;