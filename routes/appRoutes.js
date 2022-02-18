const express = require("express");
const router = express.Router();

// require Routers
const authRouter = require('./authentication');
const adminRouter = require('./admin');
const bloggerRouter = require('./blogger');

// require Model
const User = require('../models/user');

/*---------------------------- index page ----------------------------*/
// GET request to render index page
router.get("/", (req, res) => res.render('index'));

/*---------------------------- Auth ----------------------------*/
router.use('/auth', authRouter);

/*---------------------------- Admin ----------------------------*/
router.use('/admin', adminRouter);

/*---------------------------- User ----------------------------*/
router.use('/blogger', bloggerRouter);





module.exports = router;