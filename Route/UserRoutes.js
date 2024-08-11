const express = require('express');
const router = express.Router();
const UserController = require('../Controller/UserController');
const checkUser = require('./Middleware/UserMiddleware');

router.post('/signup',checkUser,UserController.signup_post);

router.post('/login',checkUser,UserController.login_post);

router.get('/logout/:id',checkUser,UserController.logout_get);

router.get('/profile/:id',checkUser,UserController.my_profile_get);

router.get('/users',checkUser,UserController.all_users_get);

router.put('/update/:id',checkUser,UserController.update_profile_put);

router.delete('/delete/:id',checkUser,UserController.delete_my_profile);

moudle.exports = router;