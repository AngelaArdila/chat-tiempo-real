const express = require("express");
const router = express.Router();
const {getMessages } = require("../controllers/chatControler");

router.get("/messages", getMessages);

module.exports = router;