# Client Side Routing w/ React Router v. 4

Topics:

* React Router
* Passing Route Parameters

## Instructions
* **Fork** this repository, then clone your fork.
* Run `yarn` or `npm install` to download dependencies.
* Run the server using `yarn start`, `npm start` or `node server.js`.
* In a separate terminal cd into the `client` folder and run `yarn` or `npm install` to download dependencies.
* Still inside the `client` folder run `yarn start` or `npm start` to run the client application.
* Inside `/client/src/index.js` add two routes.
  * one route for `/` that loads the `MovieList` component.
  * one route that will take an `id` parameter after`/movies/` (ex: `/movies/2`, `/movies/3` where the id is dynamic). This route should load the `Movie` component.
* When a user clicks on a movie card they should be taken to `/movies/id of movie here` to see the details for the selected movie.
* Add a link back to the home page from the `Movie` component inside `/client/src/Movies/Movie.js`.
* Modify line 12 on the `Movie` component to read the id from the URL.