const router = require('express').Router();
const userRouter = require('./userRouter')

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Ready to use'
    })
})

router.use('/users', userRouter)

module.exports = router;