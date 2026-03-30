const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const {userController} = require('../controllers/');

const router = express.Router();

// router.get('/requests/:id', authMiddleware, memberRequestController.user_requests);
// router.get('/searches', optionalAuthMiddleware, searchController.user_searches);
// router.post('/login', userController.login);
// router.put('/update/banner', authMiddleware, upload.single("banner"), userController.updateBanner);
// router.delete('/:id', authMiddleware, userController.destroy);

module.exports = router;
