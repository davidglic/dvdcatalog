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
            res.render('library/index.ejs', { dvdList: dvdList, user: dvdList[0].User })
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
//'/dvd/:user/:dvd' is the route
const displayCard = (req, res) => {
    DVD.findByPk(req.params.dvd, {
        include: [
            {model: Imdb,
            attributes: ['id', 'imdbnum']},
            {model: Location,
            attributes: ['id','name']}

        ]
    }).then(movieresult => {
        User.findByPk(req.params.user).then(user => {
            res.render('library/card.ejs', {user: user, movie: movieresult})
        })
    })
    // res.render('library/card.ejs')
}

//dvd card edit display
//query and pass dvd and location info to edit-card.ejs
const displayEditCard = (req, res) => {
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
}

//post dvd edit
//post changes to db and return to card card.ejs.
const postEditCard = (req, res) => {
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
}

//post dvd delete
//destory dvd in database and return to main index.
const deleteCard = (req, res) => {
    DVD.destroy({where: {id: req.params.dvd}}).then( () => {
        res.redirect(`/library/${req.params.user}`)
    })
}

//new card display
//pass user and locations to new-card.ejs 
const displayNewCard = (req, res) => {
    User.findByPk(req.params.user).then(user => {
        Location.findAll({where: {user_id: req.params.user}}).then( locations => {
            res.render('library/new-card.ejs', {user:user, locations: locations})}
        )
        
    })
    
}

//post new card
// udpate dvd and IMDB db with new card and load card.ejs with new card.
// is passed name, year, imdbID, and location ID
const postNewCard = (req, res) => {

    Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(idExists => {  
        if (idExists === null) {
            console.log('false!')
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
    // let imdbRef = 0 
    // Imdb.findOne({where: {imdbnum: req.body.imdbnum}}).then(result => {
    //     if (result === null) {
    //         console.log('null!')
    //        imdbRef = Imdb.create({imdbnum: req.body.imdbnum})
    //        console.log("new = " + imdbRef)
    //     } else {
    //         imdbRef = result.id
    //         console.log(result.id)
    //     }
    // }).then( ()=> {

    //     // imdbRef = newId.id
    //     const newDVD = {
    //         name: req.body.name,
    //         year: req.body.year,
    //         location_id: req.body.location_id,
    //         imdb_id: imdbRef,
    //         user_id: req.params.user
    //     }
    //     console.log(newDVD)
    //     DVD.create(newDVD).then( () =>
    //         res.redirect(`/library/${req.params.user}`))
    // })


}



//display locations
// query location db by user id and pass list to locations.ejs
const displayLocations = (req, res) => {
    User.findByPk(req.params.user).then(user => {
        Location.findAll({where: {user_id: req.params.user}}).then( locations => {
            res.render('library/locations.ejs', {user: user, locations: locations}) 
        })
    })
    // res.render('library/locations.ejs')
}

//post location
//update db with new loctation and reloade locations.ejs

//update locatoin
//update db loctation and reloade locations.ejs
const updateLocation = (req, res) => {
    Location.update(req.body, {where: {id: req.params.loc}}).then( () => {
        User.findByPk(req.params.user).then(user => {
            Location.findAll({where: {user_id: req.params.user}}).then( locations => {
                res.render('library/locations.ejs', {user: user, locations: locations}) 
            })
        })
    })
}

//delete location
// delete db loctation and reloade locations.ejs


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
    updateLocation
}