# dvdcatalog
## DVD Library Card Catalog

I own too many DVD's to remember what I actually own or don't own. This project simulates a library card catalog so I can check on the go. It also records where I store my indivdual DVDs so I know were to look for them.

## User Stories

- John Doe logs into app to see his movies.
- John can view titles by all or first letter of title.
- Jane can add a movie.
- John can view a movie's "catalog card" showing Title,- poster, short summary, director, and - genre's fetched from OMDb API. And, location in Library, year, and IMDB ID from database.
- Jane will see a message on catalog card if IMDB ID is unavailable or invalid.
- Jane can click IMDB ID to got to IMDB page as well.
- John can remove a movie from the catalog.
- John can edit a movie's "catalog card"
- Jane can view comfortably on her cell phone.
- Jane will see a message on catalog card if IMDB ID is unavailable or invalid.


## MVP 

load page and show a list of Titles, IMDB ID's, and location

## Next steps

- add login w/ persistent session
https://medium.com/weekly-webtips/how-to-create-a-simple-login-functionality-in-express-5274c44c20df
- add sign up
- add new location page
- add new page
- view card page with no API
- edit/delete page
- skeletal styling--just put DOM things in their places/placeholders.

## Then
- Implement API to populate card
- error on card display if api fails.
- add sidebar nav options to list by all, a,b,c... or location
- add data validation for IMDB ID? unique user login? 
- add search
- fancy styling
- set up for mobile and desktop.

# Wireframes and Models

70s Typewriter<br/>
![Typewriter](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/yellowtypewriter.png)
Theme was inspired by sleek, colorful, and modern designs from the 70s like this typewriter.

List Page<br/>
![list page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/index%20screenshot.png)
Main index page loaded after login shows entire library.

Sorted List Page<br/>
![landing page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/sorted%20index%20screen.png)
After clicking a letter on the navigation bar, an index of the select letter displays.

Card Page<br/>
![card page](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/cardscreenshot.png)
After clicking a record on an index a details card is loaded. Information including director, writer, genre, actors, plot and movie poster are loaded from OMDB API.

Database Model<br/>
![database model](https://raw.githubusercontent.com/davidglic/dvdcatalog/main/images/sorted%20index%20screen.png)

Users Table stores username and password.
Locations Table stores name and Usersid to keep track of both who owns a DVD and where it is stored.
DVDs table stores name of DVD,  Location ID to assign owner, and IMDB reference ID for additional data.
IMDBs table stores the IMDB ID# as imdbnum.

# Installation
