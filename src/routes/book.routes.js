const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const insertMiddleware = require('../middlewares/data_validation/users/insertMiddleware');
const updateMiddleware = require('../middlewares/data_validation/users/updateMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const {bookController} = require('../controllers/');

const router = express.Router();

router.post('/store', authMiddleware, adminMiddleware, bookController.store);
router.put('/update', authMiddleware, adminMiddleware, bookController.update);
router.put('/update/cover', authMiddleware, adminMiddleware, bookController.updateCover);
router.delete('/destroy', authMiddleware, adminMiddleware, bookController.destroy);

// router.get('/requests/:id', authMiddleware, memberRequestController.user_requests);password_recover
// router.get('/searches', optionalAuthMiddleware, searchController.user_searches);
// router.post('/login', bookController.login);
// router.put('/update/banner', authMiddleware, upload.single("banner"), bookController.updateBanner);
// router.delete('/:id', authMiddleware, bookController.destroy);

module.exports = router;
