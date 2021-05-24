//library controllers

//import databases
//all
const User = require('../models').User
const Imdb = require('../models').Imdb
const DVD = require('../models').DVD
const Location = require('../models').Location


//main index
//query all dvds in library alphabetically and pass to index.ejs to list on screen
//fed /:user
const index = (req, res) => {
    // User.findByPk(req.params.user, {
    //     include: [{
    //         model: DVD,
    //         attributes: ['id', 'name', 'year', 'location_id']
    //     }]
    // }).then(user => {
    //     console.log(user.DVDs[0].name)
    //     res.render('library/index.ejs', { user:user })
    // })
    DVD.findAll({
        where: {
            user_id: req.params.user
            },
        include: [
            {model: User,
            attributes: ['id', 'name']
            },
            {model: Location,
            attributes: ['id', 'name']
            },
            {model: Imdb,
            attributes: ['id', 'imdbnum']
            }
        ]
        }).then(dvdList => {
            // console.log(dvdList[0].User.name + dvdList[0].Location.name + dvdList[0].Imdb.imdbnum)
            console.log(dvdList[0].Imdb.imdbnum)
            res.render('library/index.ejs', { dvdList })
        }
        )
    // res.render('library/index.ejs')
}

//query all dvds that start with <letter> and pass to index.ejs to list on screen
const sorted = (req, res) => {
    res.render('library/sorted.ejs')
}

//dvd card display
//query data based on dvd id and pass id, name, location info, and imdbid# to card.ejs to display single dvd info--fetch api info here????
const displayCard = (req, res) => {
    res.render('library/card.ejs')
}

//dvd card edit display
//query and pass dvd and location info to edit-card.ejs
const displayEditCard = (req, res) => {
    res.render('library/edit-card.ejs')
}

//post dvd edit
//post changes to db and return to card card.ejs.

//post dvd delete
//destory dvd in database and return to main index.

//new card display
//pass user and locations to new-card.ejs 
const displayNewCard = (req, res) => {
    res.render('library/new-card.ejs')
}

//post new card
// udpate dvd and IMDB db with new card and load card.ejs with new card.

//display locations
// query location db by user id and pass list to locations.ejs
const displayLocations = (req, res) => {
    res.render('library/locations.ejs')
}

//post location
//update db with new loctation and reloade locations.ejs

//update locatoin
//update db loctation and reloade locations.ejs

//delete location
// delete db loctation and reloade locations.ejs

module.exports = {
    index,
    sorted,
    displayCard,
    displayEditCard,
    displayNewCard,
    displayLocations
}