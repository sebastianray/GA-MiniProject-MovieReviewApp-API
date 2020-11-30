const { Router } = require('express');
const router = Router();
const userRoutes = require('./user')
const movieRoutes = require('./movie')
const reviewRoutes = require('./review')

router.get('/', (req,res)=>{
    res.status(200).json({
        message : "This is home page thanks."
    })
});
router.use('/users', userRoutes)
router.use('/movies', movieRoutes)
router.use('/review', reviewRoutes)

module.exports = router;