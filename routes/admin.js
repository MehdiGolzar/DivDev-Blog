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
// GET request to Render Dashboard
router.get("/dashboard", adminControllers.dashboard);

/*---------------------------- Profile ----------------------------*/
// GET request to Render Profile
router.get("/profile", adminControllers.profile);

// PUT request to Update Profile
router.put('/update', adminControllers.update);

// POST request to Upload Avatar
router.post('/uploadAvatar', generalTools.uploadAvatar.single('avatar'), adminControllers.uploadAvatar);

// DELETE request to Delete Admin
router.delete('/delete', adminControllers.Delete);

// GET request to get Users List
router.get('/getUsers', adminControllers.getUsers);

// DELETE request to Delete User
router.delete('/:userId', adminControllers.DeleteUser);





module.exports = router;