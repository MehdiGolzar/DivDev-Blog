const express = require("express");
const router = express.Router();

const authTools = require('../tools/authentication');
const authControllers = require('../controllers/authentication');
const adminController = require('../controllers/admin');

// Get request to render Admin Dashboard
router.get('/dashboard', authTools.sessionChecker_login, adminController.dashboard);

// Get request to render Admin Profile
router.get('/profile', authTools.sessionChecker_login, adminController.profile);

// // Get request to Logout Admin
// router.get('/logout', authControllers.logout)

router.get('/getUsers', adminController.getUsers);



module.exports = router;