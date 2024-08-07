const userController = require('../controllers/userController');
const { authorization } = require('../middlewares/authorization');

const router = require('express').Router();

// router.get('/', userController.getUsers);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);

router.use(authorization)

router.post('/:id/user-profile', userController.addUserProfile);
router.get('/:id/user-profile', userController.getUserProfile);
router.put('/:id/user-profile', userController.editUserProfile);

module.exports = router;