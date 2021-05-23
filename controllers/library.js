//library controllers

//import databases
//all
const index = (req, res) => {
    res.render('library/index.ejs')
}

//main index
//query all dvds in library alphabetically and pass to index.ejs to list on screen

//query all dvds that start with <letter> and pass to index.ejs to list on screen

//dvd card display
//query data based on dvd id and pass id, name, location info, and imdbid# to card.ejs to display single dvd info--fetch api info here????

//dvd card edit display
//query and pass dvd and location info to edit-card.ejs

//post dvd edit
//post changes to db and return to card card.ejs.

//post dvd delete
//destory dvd in database and return to main index.

//new card display
//pass user and locations to new-card.ejs 

//post new card
// udpate dvd and IMDB db with new card and load card.ejs with new card.

//display locations
// query location db by user id and pass list to locations.ejs

//post location
//update db with new loctation and reloade locations.ejs

//update locatoin
//update db loctation and reloade locations.ejs

//delete location
// delete db loctation and reloade locations.ejs

module.exports = {
    index
}