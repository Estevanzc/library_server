const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const insertMiddleware = require('../middlewares/data_validation/loans/insertMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const { loanController } = require('../controllers/');

const router = express.Router();

router.post('/store', authMiddleware, adminMiddleware, insertMiddleware, loanController.store);
router.put('/update/renew', authMiddleware, loanController.renew);
router.put('/update/return', authMiddleware, adminMiddleware, loanController.book_return);

module.exports = router;
