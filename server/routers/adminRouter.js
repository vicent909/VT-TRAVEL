const travelController = require('../controllers/travelController');
const upload = require('../helpers/multer');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.get('/', travelController.getTravel);
router.post('/', authentication, authorization, travelController.addTravel);
router.get('/userTravel',authentication , travelController.getUserTravel);
router.post('/userTravel/:id/:UserId',authentication , travelController.joinTravel);
router.get('/image/:id', authentication, authorization, travelController.getImage);
router.post('/image/:id',authentication, authorization ,upload.single('image'), travelController.addImageTravel);
router.get('/:id', travelController.getTravelById);
router.put('/:id', travelController.editTravel);

module.exports = router;