const { Router } = require('express');
const router = Router();
const ReviewController = require('../controllers/review')

const { authentication, authorization } = require('../middlewares/authReview')

router.get('/list', authentication, ReviewController.getReview)
router.post('/movie/:MovieId', authentication, ReviewController.addReview)
router.get('/movie=:MovieId/:page', ReviewController.reviewByMovie);
router.get('/user/:UserId', ReviewController.reviewByUser);
router.delete('/:id',authentication, authorization, ReviewController.deleteReview)
router.put('/:id',authentication, authorization, ReviewController.editReview)

module.exports = router;