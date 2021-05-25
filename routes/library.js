//import express
//import controllers
const express = require('express')
const router = express.Router()
const ctrl = require('../controllers')

//.get profile index list page /users/:index = user id list all
router.get('/:user', ctrl.library.index)

//.get /add/:user add new DVD card display
router.get('/add/:user/', ctrl.library.displayNewCard)

//.post /add/:user add new DVD
router.post('/add/:user/', ctrl.library.postNewCard)

//.get /loc/:user list locatoins add included in page.
router.get('/loc/:user/', ctrl.library.displayLocations)

//.post/loc/:user add new location refresh page.
router.post('/loc/:user', ctrl.library.addLocation)

//.put/loc/:user/:loc update locatoin by button
router.put('/loc/:user/:loc', ctrl.library.updateLocation)

//.delete/loc/:user delete locatoin by button


//.get profile index list page /users/:index/:sort display sorted list
router.get('/:user/:sort', ctrl.library.sorted)

//.get /dvd/:user/:dvd = dvd id dvd card display
router.get('/dvd/:user/:dvd', ctrl.library.displayCard)

//.get /edit/:user/:dvd dislpay edit card
router.get('/edit/:user/:dvd', ctrl.library.displayEditCard)

//.post /edit/:user/:dvd edit and return to list all
router.post('/edit/:user/:dvd', ctrl.library.postEditCard)

//.delete /edit/:user/:dvd delete and return to list all
router.delete('/edit/:user/:dvd', ctrl.library.deleteCard)




//exports
module.exports = router