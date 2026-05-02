const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const insertMiddleware = require('../middlewares/data_validation/books/insertMiddleware');
const updateMiddleware = require('../middlewares/data_validation/books/updateMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const {bookController, bookReviewController, bookRatingController, preferenceController, favoriteController} = require('../controllers/');

const router = express.Router();

router.post('/store', authMiddleware, adminMiddleware, insertMiddleware, bookController.store);
router.put('/update', authMiddleware, adminMiddleware, updateMiddleware, bookController.update);
router.put('/update/cover', authMiddleware, adminMiddleware, bookController.updateCover);
router.delete('/destroy', authMiddleware, adminMiddleware, bookController.destroy);

router.post('/rating/store', authMiddleware, bookRatingController.store);
router.put('/rating/update', authMiddleware, bookRatingController.update);

router.post('/review/store', authMiddleware, bookReviewController.store);
router.put('/review/update', authMiddleware, bookReviewController.update);
router.delete('/review/destroy/:id', authMiddleware, bookReviewController.destroy);

router.post('/preferences/store', authMiddleware, preferenceController.store);
router.delete('/preferences/destroy/:id', authMiddleware, preferenceController.destroy);

router.post('/favorites/store', authMiddleware, favoriteController.store);
router.delete('/favorites/destroy/:id', authMiddleware, favoriteController.destroy);

module.exports = router;
