//user controllers

const { users } = require(".")

//import databases
//user DB
const User = require('../models').User
const DVD = require('../models').DVD
const Location = require('../models').Location

//index - landing
// load index.ejs
const index = (req, res) => {
    res.render('users/index.ejs')
}

//post new user
// sign up new user
//default values of 'general' for a location and the princess bride for DVD
// render to library/index.ejs passing user.

//post login
// check user id exists and check password
//ender to library/index.ejs passing user.
//alert "Invalded User ID or password. if failed."
const loginUser = (req,res) => {
    User.findOne({where: {name: req.body.userID}}).then(result => {
        if (result.password === req.body.password) {
            res.redirect(`/library/${result.id}`)
        } else {
            console.log("Invalid password.")
            res.redirect(`back`)
        }
    }
        
    ).catch( () => {
        console.log("Invalid userid.")
        res.redirect(`back`)
    })
}

//display edit user
//display edit-user.ejs passing userID
const editUser = (req,res) => {
    res.render('users/edit-user.ejs')
}

//post user edit
// update changed password.
//rendier /library/index.ejs passing user.

module.exports = {
    index,
    editUser,
    loginUser
}