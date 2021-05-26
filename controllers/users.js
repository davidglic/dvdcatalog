//user controllers

// const { users } = require(".")

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
const createUser = (req,res) => {
    User.findOne({where: {name: req.body.name}}).then(result => {
        if (result === null) {
            User.create({name: req.body.name, password: req.body.password}).then(newuser => {
                Location.create({name: 'Default', user_id: newuser.id}).then( () => {
                    req.session.loggedIn = true
                    req.session.username = req.body.name
                    req.session.user_id = newuser.id
                    res.redirect(`/library/${newuser.id}`)
                })
            })
        } else {
            res.render("users/index.ejs", {error: "User ID already in use."})
         }
    })
}
//post login
// check user id exists and check password
//ender to library/index.ejs passing user.
//alert "Invalded User ID or password. if failed."
const loginUser = (req,res) => {
    User.findOne({where: {name: req.body.userID}}).then(result => {
        if (result.password === req.body.password) {

            //session info
            req.session.loggedIn = true
            req.session.username = req.body.userID
            req.session.user_id = result.id
            

            res.redirect(`/library/${result.id}`)

        } else {
            console.log("Invalid password.")
            // res.redirect(`back`, {error: "Invalid password."})
            res.render("users/index.ejs", {error: "Invalid Password."})
        }
    }
        
    ).catch( () => {
        console.log("Invalid userid.")
        res.render("users/index.ejs", {error: "Invalid User ID."})
    })
}

//display edit user
//display edit-user.ejs passing userID
const editUser = (req,res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        User.findByPk(req.params.user).then(
            user => {
                res.render('users/edit-user.ejs', {user: user})  
            }
        )
        // res.render('users/edit-user.ejs')
      } else {
        res.redirect('/') 
      }
    
}

//post user edit
// update changed password.
//rendier /library/index.ejs passing user.
const postEditUser = (req,res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        console.log("update pw to " + req.body.password)
        User.update({password: req.body.password}, 
            {where: {id: req.params.user}, returning: true})
            .then(
                res.redirect(`/library/${req.params.user}`)
            )
        
      } else {
        res.redirect(`/`) 
      }
}

//logout
const logout = (req,res) => {
    req.session.destroy((err)=>{})
    console.log(req.session)
    res.render("users/index.ejs", {error: "Logged out."})
}

module.exports = {
    index,
    editUser,
    loginUser,
    createUser,
    logout,
    postEditUser
}