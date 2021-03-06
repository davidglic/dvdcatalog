//library controllers

//import databases
//all
const User = require('../models').User
const Imdb = require('../models').Imdb
const DVD = require('../models').DVD
const Location = require('../models').Location
const { Op } = require("sequelize")

//apikey here!
const apiKey = "4d820502"

//import fetch
const fetch = require('node-fetch')

//main index
//query all dvds in library alphabetically and pass to index.ejs to list on screen
//pass dvdlist and user info.
const index = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        DVD.findAll({
            where: {
                user_id: req.params.user
                },
                order: [['name', 'ASC']],
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
                res.render('library/index.ejs', { dvdList: dvdList, user: dvdList[0].User })
            }
            ).catch( () => {
                res.redirect(`/library/add/${req.params.user}`)
            })    
    } else {
        res.redirect('/') 
    }
}

//Sorted Index
//query all dvds that start with <letter> and pass dvdList and User info to index.ejs to list on screen
const sorted = (req, res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        DVD.findAll({
            where: {
                [Op.and]: [{user_id: req.params.user},{name: {[Op.like]: `${req.params.sort}%`}}]
                },
                order: [['name', 'ASC']],
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
                res.render('library/sorted.ejs', { dvdList: dvdList, user: dvdList[0].User })
            }
            ).catch( () => {
                res.redirect(`/library/add/${req.params.user}`)
            })
    } else {
        res.redirect('/') 
    }
   
}

//dvd card display
//query data based on dvd id and pass id, name, location info, and imdbid# to card.ejs to display single dvd info?
//'/dvd/:user/:dvd' is the route
const displayCard = (req, res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        DVD.findByPk(req.params.dvd, {
            include: [
                {model: Imdb,
                attributes: ['id', 'imdbnum']},
                {model: Location,
                attributes: ['id','name']}
    
            ]
        }).then(movieresult => {
            
            //api request
            fetch(`http://www.omdbapi.com/?i=${movieresult.Imdb.imdbnum}&apikey=${apiKey}`)
            .then(apiResponse => apiResponse.json())
            .then(apiInfo => {
                User.findByPk(req.params.user).then(user => {
                    res.render('library/card.ejs', {user: user, movie: movieresult, apiInfo: apiInfo})
                })
            })
    
        })
      } else {
        res.redirect('/') 
      }
}

//dvd card edit display
//query and pass user, dvd, and location info to edit-card.ejs
const displayEditCard = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        DVD.findByPk(req.params.dvd, {
            include: [
                {model: Imdb,
                attributes: ['id', 'imdbnum']},
                {model: Location,
                attributes: ['id','name']}
    
            ]
        }).then(movieresult => {
            User.findByPk(req.params.user).then(user => {
                Location.findAll({where: {user_id: req.params.user}}).then( locations => {
                    res.render('library/edit-card.ejs', {user: user, movie: movieresult, locations: locations})
                }
                    
                )
            })
        })
      } else {
        res.redirect('/') 
      }
}

//post dvd edit
//post changes to db and return to card card.ejs.
const postEditCard = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(idExists => {
            if (idExists === null) {
                Imdb.create({imdbnum: req.body.imdbnum}).then( () => {
                    Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(result => {
                        const updatedDVD = {
                            name: req.body.name,
                            year: req.body.year,
                            location_id: req.body.location_id,
                            imdb_id: result.id,
                            user_id: req.params.user
                        }
                        DVD.update(updatedDVD, {where: {id: req.params.dvd}, returning: true}).then( () => {
                            res.redirect(`/library/${req.params.user}`)
                        })
                    })
                })
            } else {
                Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(result => {
                    const updatedDVD = {
                        name: req.body.name,
                        year: req.body.year,
                        location_id: req.body.location_id,
                        imdb_id: result.id,
                        user_id: req.params.user
                    }
                    DVD.update(updatedDVD, {where: {id: req.params.dvd}, returning: true}).then( () => {
                        res.redirect(`/library/${req.params.user}`)
                    })
                })
            }
        })
      } else {
        res.redirect('/') 
      }
}

//post dvd delete
//destory dvd in database and return to main index.
const deleteCard = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        DVD.destroy({where: {id: req.params.dvd}}).then( () => {
            res.redirect(`/library/${req.params.user}`)
        })
      } else {
        res.redirect('/') 
      }
}

//new card display
//pass user and locations to new-card.ejs 
const displayNewCard = (req, res) => {
    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        User.findByPk(req.params.user).then(user => {
            Location.findAll({where: {user_id: req.params.user}}).then( locations => {
                res.render('library/new-card.ejs', {user:user, locations: locations})}
            )
            
        })
      } else {
        res.redirect('/') 
      }
}

//post new card
// udpate dvd and IMDB db with new card and redirect to index
// is passed name, year, imdbID, and location ID
const postNewCard = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(idExists => {  
            if (idExists === null) {
                Imdb.create({imdbnum: req.body.imdbnum}).then( () => {
                        Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(result => {
                            const newDVD = {
                                name: req.body.name,
                                year: req.body.year,
                                location_id: req.body.location_id,
                                imdb_id: result.id,
                                user_id: req.params.user
                            }  
                            DVD.create(newDVD).then( () => {
                                res.redirect(`/library/${req.params.user}`)
                            })
                        })
                    
                })
            } else {
                Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(result => {
                    const newDVD = {
                        name: req.body.name,
                        year: req.body.year,
                        location_id: req.body.location_id,
                        imdb_id: result.id,
                        user_id: req.params.user
                    } 
                    DVD.create(newDVD).then( () => {
                        res.redirect(`/library/${req.params.user}`)
                    }) 
                })
            }
        }) 
      } else {
        res.redirect('/') 
      }  
}



//display locations
// query location db by user id and pass list of locations and user to locations.ejs
const displayLocations = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        User.findByPk(req.params.user).then(user => {
            Location.findAll({where: {user_id: req.params.user}}).then( locations => {
                res.render('library/locations.ejs', {user: user, locations: locations}) 
            })
        })
      } else {
        res.redirect('/') 
      }
}

//post location
//update db with new loctation and reloade locations.ejs
const addLocation = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        Location.create({name: req.body.name, user_id: req.params.user}).then(
            Location.findAll({where: {user_id: req.params.user}}).then(locations => {
                User.findByPk(req.params.user).then(user => {
                res.redirect('back')
                })
            })
        )
      } else {
        res.redirect('/') 
      }
}

//update locatoin
//update db loctation and reloade locations.ejs
const updateLocation = (req, res) => {

    if(req.session.loggedIn && req.session.user_id === Number(req.params.user)) {
        Location.update(req.body, {where: {id: req.params.loc}}).then( () => {
            User.findByPk(req.params.user).then(user => {
                Location.findAll({where: {user_id: req.params.user}}).then( locations => {
                    res.render('library/locations.ejs', {user: user, locations: locations}) 
                })
            })
        })
      } else {
        res.redirect('/') 
      }
}

//delete location
// delete db loctation and reloade locations.ejs
//--to be implented later-- location is apparenty an awkward linchpin in many operations.


module.exports = {
    index,
    sorted,
    displayCard,
    displayEditCard,
    displayNewCard,
    displayLocations,
    postNewCard,
    postEditCard,
    deleteCard,
    updateLocation,
    addLocation
}