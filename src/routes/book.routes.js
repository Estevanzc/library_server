const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const insertMiddleware = require('../middlewares/data_validation/books/insertMiddleware');
const updateMiddleware = require('../middlewares/data_validation/books/updateMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const {bookController, bookReviewController, bookRatingController, preferenceController, favoriteController, loanController} = require('../controllers/');

const router = express.Router();

router.get('/view', optionalAuthMiddleware, bookController.view);
router.get('/search', optionalAuthMiddleware, bookController.search);
router.get('/ranking/view', authMiddleware, bookController.getMostViewed);
router.get('/ranking/review', bookReviewController.getMostReviewed);
router.get('/ranking/rating', bookRatingController.getBestRated);
router.get('/ranking/loan', loanController.getMostLoaned);
router.get('/publisher/:id', bookController.getByPublisher);
router.get('/author/:id', bookController.getByAuthor);
router.get('/genre/:id', bookController.getByGenre);
router.get('/category/:id', bookController.getByCategory);
router.get('/preference', authMiddleware, preferenceController.getByPreference);
router.post('/store', authMiddleware, adminMiddleware, insertMiddleware, bookController.store);
router.put('/update', authMiddleware, adminMiddleware, updateMiddleware, bookController.update);
router.put('/update/cover', authMiddleware, adminMiddleware, bookController.updateCover);
router.delete('/destroy', authMiddleware, adminMiddleware, bookController.destroy);

router.get('/ratings/user/:id', bookRatingController.getRatingsByUser);
router.get('/ratings/book/:id', bookRatingController.getRatingsByBook);
router.post('/rating/store', authMiddleware, bookRatingController.store);
router.put('/rating/update', authMiddleware, bookRatingController.update);

router.get('/reviews/user/:id', bookReviewController.getReviewsByUser);
router.get('/reviews/book/:id', bookReviewController.getReviewsByBook);
router.post('/review/store', authMiddleware, bookReviewController.store);
router.put('/review/update', authMiddleware, bookReviewController.update);
router.delete('/review/destroy/:id', authMiddleware, bookReviewController.destroy);

router.post('/preferences/store', authMiddleware, preferenceController.store);
router.delete('/preferences/destroy/:id', authMiddleware, preferenceController.destroy);

router.get('/favorites/:id', authMiddleware, favoriteController.getFavoritesByUser);
router.post('/favorites/store', authMiddleware, favoriteController.store);
router.delete('/favorites/destroy/:id', authMiddleware, favoriteController.destroy);

module.exports = router;
