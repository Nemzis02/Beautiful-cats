const express = require('express');
const router = express.Router();

const user = require('../controllers/user');

router.put('/send-images', user.putSendImages);

module.exports = router;
