const travelController = require('../controllers/travelController');

const router = require('express').Router();

router.get('/', travelController.getTravel);
router.post('/', travelController.addTravel);
router.get('/userTravel', travelController.getUserTravel);
router.post('/userTravel/:id/:UserId', travelController.joinTravel);
router.get('/:id', travelController.getTravelById);
router.put('/:id', travelController.editTravel);

module.exports = router;