const express = require('express');
const router = express.Router();

router.use(require('./user.js'));
router.use('/blogpost', require('./blogpost.js'));

module.exports = router;