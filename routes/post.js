const express = require("express");
const router = express.Router();

const postController = require ('../controllers/postColler')
router.get('/', postController.index) //first endpoint get slash and post controller

module.exports = router;