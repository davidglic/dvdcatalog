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
  cookie: {secure:false, maxAge: 1200000}
  }
))


//routes import here
const routes = require('./routes')
app.use('/users', routes.users)
app.use('/library', routes.library)

//enable css
//directory = /css/foo.css
app.use(express.static('public'))

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



