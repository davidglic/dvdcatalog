//imports
// import express, body parser, method override 
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const session = require('express-session')
app.use(session(
  {secret: 'this is SECRET',
  name:'uniqueSessionID',
  saveUninitialized: false,
  cookie: {secure:false, maxAge: 900000}
  }
))


//models here

//routes import here
const routes = require('./routes')
app.use('/users', routes.users)
app.use('/library', routes.library)

//enable css
//directory = /css/foo.css
app.use(express.static('public'))

//export api key from here.



//default landing reroute.
app.get('/', (req, res) => {
  console.log(req.session)
  if(req.session.loggedIn) {
    res.redirect(`/library/${req.session.user_id}`)
} else {
    res.render('users/index.ejs')
}
    

})


//run server 
app.listen(3000, () => {
console.log('Server initialized.')
})


//scratch pad
  //npx sequelize model:generate --name User --attributes name:string,password:string
  //npx sequelize model:generate --name Location --attributes name:string,user_id:integer
  //npx sequelize model:generate --name Imdb --attributes imdbnum:string
//npx sequelize model:generate --name DVD --attributes name:string,year:integer,location_id:integer,imdb_id:integer

// if(req.session.loggedIn) {
//   console.log("User logged in.")
// } else {
//   console.log("User logged out.")
// }