const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/panel', adminController.panel);

router.get('/getUsers', adminController.getUsers);



module.exports = router;