const { Router } = require('express');
const router = Router();
const UserController = require('../controllers/user')
const uploadImage = require('../middlewares/multer')
const { authentication, authorization } = require('../middlewares/authAdmin')

router.get('/', authentication, authorization, UserController.list)
router.post('/login', UserController.login)
router.post('/register', uploadImage, UserController.register)
router.get('/profile', authentication,UserController.profile)
router.put('/editprofile', authentication, uploadImage, UserController.editUser)
router.delete('/delete', authentication, UserController.deleteUser)

module.exports = router;