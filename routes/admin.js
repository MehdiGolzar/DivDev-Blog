// Express
const express = require("express");
const router = express.Router();

// require Model
const User = require('../models/user');

// require Controllers
const adminControllers = require('../controllers/admin');

// require Tools
const generalTools = require('../tools/general');


/*---------------------------- Dashboard ----------------------------*/
// Get request to Render Dashboard
router.get("/dashboard", adminControllers.dashboard);

/*---------------------------- Profile ----------------------------*/
// Get request to Render Profile
router.get("/profile", adminControllers.profile);

// Put request to Update Profile
router.put('/update', adminControllers.update);

// Post request to Upload Avatar
router.post('/uploadAvatar', generalTools.uploadAvatar.single('avatar'), adminControllers.uploadAvatar);

// Delete request to Delete User
router.delete('/delete', adminControllers.Delete);



router.get('/getUsers', adminControllers.getUsers);



module.exports = router;