const express = require("express");
const router = express.Router()

const authValidation = require('../validation/authentication');
const authTool = require('../tools/authentication')
const authController = require('../controllers/authentication');


/*---------------------------- Create Admin ----------------------------*/
router.post('/createAdmin', authController.createAdmin)

/*---------------------------- Register ----------------------------*/
// GET request to render register page
router.get("/register", authTool.sessionChecker, authController.register_get);

// POST request to register new user
router.post("/register", authValidation.userValidation() , authController.register_post);

/*---------------------------- Login ----------------------------*/
// GET request to render login page
router.get("/login", authTool.sessionChecker, authController.login_get);

// POST request to login user
router.post("/login", authController.login_post);

/*---------------------------- Dashboard ----------------------------*/
router.get("/dashboard", authController.dashboard);

/*---------------------------- Logout ----------------------------*/
router.get('/logout', authController.logout)


module.exports = router;