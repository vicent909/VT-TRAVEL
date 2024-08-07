const travelController = require('../controllers/travelController');
const upload = require('../helpers/multer');

const router = require('express').Router();

router.get('/', travelController.getTravel);
router.post('/', travelController.addTravel);
router.get('/userTravel', travelController.getUserTravel);
router.post('/userTravel/:id/:UserId', travelController.joinTravel);
router.get('/image/:id', travelController.getImage);
router.post('/image/:id',upload.single('image'), travelController.addImageTravel);
router.get('/:id', travelController.getTravelById);
router.put('/:id', travelController.editTravel);

module.exports = router;