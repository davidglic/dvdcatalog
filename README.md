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

##Next steps

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

Landing Page
![landing page](https://user-images.githubusercontent.com/82845270/119192428-01bb0980-ba35-11eb-9f45-7b7c1c2a0a46.png)

List Page
![list page](https://user-images.githubusercontent.com/82845270/119192442-067fbd80-ba35-11eb-9098-9d1ca1f7ee79.png)

Card Page
![card page](https://user-images.githubusercontent.com/82845270/119192450-097aae00-ba35-11eb-921b-65d92555e63f.png)

New/Edit/Delete Page
![new and edit page](https://user-images.githubusercontent.com/82845270/119192455-0c759e80-ba35-11eb-9c7c-f484e70e0e3a.png)

Storage Locations Page
![location list page](https://user-images.githubusercontent.com/82845270/119192475-13041600-ba35-11eb-9f50-8f803e79d67d.png)

Database Model
![database model](https://user-images.githubusercontent.com/82845270/119192485-16979d00-ba35-11eb-91de-addd6b1c7fde.png)


