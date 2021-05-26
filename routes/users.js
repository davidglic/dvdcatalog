//import express
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')
//import controllers

//routes
//.get landing index includes sign up form and log in
router.get('/', ctrl.users.index)

//.post /signup new sign up with form info then route to library index
router.post('/signup', ctrl.users.createUser)

//.post  /login log in and route to library index
router.post('/login', ctrl.users.loginUser)

//.get /user/edit edit user page password only???
router.get('/edit/:user', ctrl.users.editUser)

//.post /user/edit post edited user

//logout
router.get('/logout', ctrl.users.logout)

//export

module.exports = router
