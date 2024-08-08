const userController = require('../controllers/userController');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

// router.get('/', userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/google-login', userController.googleLogin);
router.get('/:id', userController.getUserById);

router.use(authentication)

router.post('/user-profile', userController.addUserProfile);
router.get('/:id/user-profile', userController.getUserProfile);
router.put('/:id/user-profile', userController.editUserProfile);

module.exports = router;