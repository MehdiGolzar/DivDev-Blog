const express = require("express");
const router = express.Router()

const authValidation = require('../validation/authentication');
const authTools = require('../tools/authentication')
const authControllers = require('../controllers/authentication');

// console.log(authTools);
/*---------------------------- Create Admin ----------------------------*/
router.post('/createAdmin', authControllers.createAdmin)

/*---------------------------- Register ----------------------------*/
// GET request to render register page
router.get("/register",authTools.sessionChecker_dashboard, authControllers.register_get);

// POST request to register new user
router.post("/register", authValidation.userValidation(), authControllers.register_post);

/*---------------------------- Login ----------------------------*/
// GET request to render login page
router.get("/login", authTools.sessionChecker_dashboard, authControllers.login_get);

// POST request to login user
router.post("/login", authControllers.login_post);

/*---------------------------- Logout ----------------------------*/
router.get('/logout', authControllers.logout)


module.exports = router;