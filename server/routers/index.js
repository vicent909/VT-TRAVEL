const router = require('express').Router();
const userRouter = require('./userRouter')
const travelRouter = require('./travelRouter')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Ready to use'
    })
})

router.use('/users', userRouter)
router.use('/travels', travelRouter)

module.exports = router;