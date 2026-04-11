const express = require('express');
const router = express.Router();

router.use('/users', require('./user.routes'));
router.use('/books', require('./book.routes'));

module.exports = router;
