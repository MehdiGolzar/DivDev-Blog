const express = require("express");
const router = express.Router();
const bloggerController = require('../controllers/blogger');


router.put('/update', bloggerController.update);

router.get('/delete', bloggerController.Delete);


module.exports = router;