const { Router } = require('express');
const router = Router();
const MovieController = require('../controllers/movie')

const { authentication, authorization } = require('../middlewares/authAdmin')

router.get('/',MovieController.getMovie)
router.get('/:page',MovieController.getMoviePage)
router.post('/search', MovieController.searchMovie)
router.get('/details/:id', MovieController.movieDetails)
router.get('/genre/:genre', MovieController.findByGenre)
router.post('/add', authentication, authorization, MovieController.addMovie)
router.delete('/delete/:id', authentication, authorization, MovieController.deleteMovie)
router.put('/edit/:id',authentication, authorization, MovieController.editMovie)


module.exports = router;