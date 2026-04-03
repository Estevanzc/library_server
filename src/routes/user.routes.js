const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const insertMiddleware = require('../middlewares/data_validation/users/insertMiddleware');
const updateMiddleware = require('../middlewares/data_validation/users/updateMiddleware');
const optionalAuthMiddleware = require('../middlewares/optionalAuthMiddleware');
const upload = require('../middlewares/upload');
const {userController} = require('../controllers/');

const router = express.Router();

router.post('/login', userController.login);
router.post('/insert', authMiddleware, adminMiddleware, insertMiddleware, userController.register);
router.post('/password/recover', authMiddleware, userController.password_recover);
router.put('/update', authMiddleware, updateMiddleware, userController.update);
router.put('/password/update', authMiddleware, userController.password_update);
router.put('/update/photo', authMiddleware, upload.single("photo"), userController.updateBanner);
router.put('/update/banner', authMiddleware, upload.single("banner"), userController.updateBanner);
router.delete('/:id', authMiddleware, adminMiddleware, userController.destroy);

// router.get('/requests/:id', authMiddleware, memberRequestController.user_requests);password_recover
// router.get('/searches', optionalAuthMiddleware, searchController.user_searches);
// router.post('/login', userController.login);
// router.put('/update/banner', authMiddleware, upload.single("banner"), userController.updateBanner);
// router.delete('/:id', authMiddleware, userController.destroy);

module.exports = router;
