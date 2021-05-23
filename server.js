//imports
// import express, body parser, method override 
const express = require('express')
const app = express()

// // was getting error saying "Error: Cannot find module 'ejs'" 
// // ejs was installed, tried install/unistall, etc still didn't work.
// //https://www.codegrepper.com/code-examples/javascript/error+cannot+find+module+%27ejs%27
// //this copy-pasta fixed???
// app.set('view engine','ejs'); 

// app.engine('ejs', require('ejs').__express);

// //end copy-pasta

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

const methodOverride = require('method-override')
app.use(methodOverride('_method'))


//models here

//routes import here
const routes = require('./routes')
app.use('/users', routes.users)
app.use('/library', routes.library)


//export api key from here.


//default landing reroute.
app.get('/', (req, res) => {
    res.render('users/index.ejs')

})


//run server 
app.listen(3000, () => {
console.log('Server initialized.')
})

