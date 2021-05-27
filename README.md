# dvdcatalog
## DVD Library Card Catalog

I own too many DVD's to remember what I actually own or don't own. This project simulates a library card catalog so I can check on the go. It also records where I store my indivdual DVDs so I know were to look for them. It is powered by a persistent SQL database and an Express framework. OMDb API allows for addtional movie details to be loaded without haveing to enter into database.

## Features

- User login with persistent sessions.
- Ability to add/edit multiple storage locations for DVDs.
- Ability to add/edit/delete DVD cards.
- OMDB API call automatically populates movie information and poster on DVD card.
- Index of DVDs sortable by starting letter.
- Retro styling inspired by 1970s typewriters and library card catalogs.
- Powered by persistent SQL database.


## Future Features

- Delete location and update DVDs to new valid location with one button.
- Styling for mobile use.
- Search feature.

## Technology Used

- Express
- Sequelize
- Node.js
- OMDb API
- CSS

## Thanks

These sources were a great help in this project.

- <a href="https://medium.com/weekly-webtips/how-to-create-a-simple-login-functionality-in-express-5274c44c20df">https://medium.com/weekly-webtips/how-to-create-a-simple-login-functionality-in-express-5274c44c20df</a>
- <a href="https://www.omdbapi.com/">OMDb API</a>

# Wireframes and Models

#### 70s Typewriter<br/>
![Typewriter](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/yellowtypewriter.png)<br/>
Theme was inspired by sleek, colorful, and modern designs from the 70s like this typewriter.

#### List Page<br/>
![list page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/index%20screenshot.png)
Main index page loaded after login shows entire library.

#### Sorted List Page<br/>
![landing page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/sorted%20index%20screen.png)
After clicking a letter on the navigation bar, an index of the select letter displays.

#### Card Page<br/>
![card page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/cardscreenshot.png)
After clicking a record on an index a details card is loaded. Information including director, writer, genre, actors, plot and movie poster are loaded from OMDB API.

#### Database Model<br/>
![database model](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/database%20model.png)

Users Table stores username and password.
Locations Table stores name and Usersid to keep track of both who owns a DVD and where it is stored.
DVDs table stores name of DVD,  Location ID to assign owner, and IMDB reference ID for additional data.
IMDBs table stores the IMDB ID# as imdbnum.

## Installation

### Required Packages
    
- body-parser
- ejs
- express
- express-session
- method-override
- node-fetch
- pg
- sequelize
- sequelize-cli

### Required software
    
    - Node.js
    - postgres

### Instructions

In console run:
```
    npm init
    npm install
    npx sequelize init
    npx sequelize db:migrate
    npx sequelize db:seed:all

```
Update library.js line 12 with your OMDb API key.

Server can be run with:
```
node server.js
```