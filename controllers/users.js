//user controllers

//import databases
//user DB

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
    editUser
}