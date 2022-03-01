// Express
const express = require("express");
const router = express.Router();

// require Model
const User = require('../models/user');

// require Controllers
const userControllers = require('../controllers/user');

// require Tools
const generalTools = require('../tools/general');


/*---------------------------- Dashboard ----------------------------*/
// Get request to Render Dashboard
router.get("/dashboard", userControllers.dashboard);

/*---------------------------- Profile ----------------------------*/
// Put request to Update Profile
router.put('/update', userControllers.update);

// Post request to Upload Avatar
router.post('/uploadAvatar', generalTools.uploadAvatar.single('avatar'), userControllers.uploadAvatar);

// Delete request to Delete User
router.get('/delete', userControllers.Delete);


module.exports = router;