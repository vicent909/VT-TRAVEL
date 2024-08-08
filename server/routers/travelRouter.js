const travelController = require('../controllers/travelController');
const upload = require('../helpers/multer');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

const router = require('express').Router();

router.get('/', travelController.getTravel);
router.get('/categories', travelController.getCategories);
router.get('/random', travelController.getRandomTravel);
router.post('/', authentication, authorization, travelController.addTravel);
router.get('/userTravel',authentication , travelController.getUserTravel);
router.post('/userTravel/:id',authentication , travelController.joinTravel);
router.delete('/userTravel/:id',authentication , travelController.deleteUserTravel);
router.get('/image/:id',authentication, authorization, travelController.getImage);
router.post('/image/:id',authentication ,upload.single('image'), travelController.addImageTravel);
router.post('/generate-midtrans-token/:id',authentication , travelController.generateMidtransToken);
router.post('/openAi', travelController.openAi);
router.get('/:id', travelController.getTravelById);
router.put('/:id',authentication, authorization, travelController.editTravel);
router.delete('/:id',authentication, authorization, travelController.deleteTravel);

module.exports = router;

// 	SB-Mid-server-_twRyfjOKtn1sy_TU0m1SJJh