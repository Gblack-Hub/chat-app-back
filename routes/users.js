"use strict"

const express = require('express');
const router = express.Router();
const users = require('../controllers/users');

//middlewares
const user_checker = require('../middlewares/user_checker');
const username_checker = require('../middlewares/username_checker');
const auth_checker = require('../middlewares/auth_checker');

router.route('/signup').post(username_checker, users.signUp);
// router.route('/').post(email_checker, users.signUp);
router.route('/users').get(users.readUsers);
router.route('/login').post(users.login);
router.route('/:id').get(auth_checker, users.readOneUser);
router.route('/update/:id').put(user_checker, users.updateUser);
router.route('/delete/:id').delete(user_checker, users.deleteUser);

module.exports = router;