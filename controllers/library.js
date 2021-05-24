//library controllers

//import databases
//all


//main index
//query all dvds in library alphabetically and pass to index.ejs to list on screen
const index = (req, res) => {
    res.render('library/index.ejs')
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