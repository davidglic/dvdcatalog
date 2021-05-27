//user controllers

//import databases
const User = require('../models').User
const DVD = require('../models').DVD
const Location = require('../models').Location

//index - landing
// load index.ejs 
const index = (req, res) => {
    res.render('users/index.ejs')
}

//post new user
//default values of 'Default' for a location. Write to User DB then Location DB.
// render to library/index.ejs passing user.
const createUser = (req,res) => {
    User.findOne({where: {name: req.body.name}}).then(result => {
        if (result === null) {
            User.create({name: req.body.name, password: req.body.password}).then(newuser => {
                Location.create({name: 'Default', user_id: newuser.id}).then( () => {

                    //session info
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
//redirect to /library/<user.id>
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
            res.render("users/index.ejs", {error: "Invalid Password."})
        }
    }
        
    ).catch( () => {
        res.render("users/index.ejs", {error: "Invalid User ID."})
    })
}

//display edit user
//render edit-user.ejs passing user obj.
const editUser = (req,res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        User.findByPk(req.params.user).then(
            user => {
                res.render('users/edit-user.ejs', {user: user})  
            }
        )
      } else {
        res.redirect('/') 
      }
    
}

//post user edit
// update changed password.
//rendier /library/index.ejs passing user.
const postEditUser = (req,res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
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
//destroy session and redirect to landing.
const logout = (req,res) => {
    req.session.destroy((err)=>{})
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