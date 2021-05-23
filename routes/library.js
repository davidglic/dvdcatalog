//import express
//import controllers
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

//.get profile index list page /users/:index = user id list all
router.get('/', ctrl.library.index)

//.get profile index list page /users/:index/:sort display sorted list

//.get /dvd/:user/:dvd = dvd id dvd card display

//.get /edit/:user/:dvd dislpay edit card
//.post /edit/:user/:dvd edit and return to list all
//.delete /edit/:user/:dvd delete and return to list all

//.get /add/:user add new DVD card display
//.post /add/:user add new DVD

//.get /loc/:user list locatoins add included in page.
//.post/loc/:user add new location refresh page.
//.put/loc/:user update locatoin by button
//.delete/loc/:user delete locatoin by button


//exports
module.exports = router