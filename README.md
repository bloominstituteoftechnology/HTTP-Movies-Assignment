# Routing

Topics:

 * React Router
 * componentDidMount
 * RouteProvider as Route
 * Switch
 * Link


## Project Description

### Initialize Project
  * **Fork** this repository, then clone your fork.
  * Run `yarn` or `npm install` to download dependencies.
  * Run the server using `yarn start`, `npm start` or `node server.js`.
  * In a separate folder use `create-react-app` to create an application.
  * Set up your application's router to serve two pages: the _home_ page and _movie details_.
  * Your home page should retrieve a list of movies from the server and display them.
  * When a user clicks on a movie title they should be taken to a second page that displays the details for the selected movie.


### Notes/Hints
 * Make the call to retrieve the list of movies from inside of `componentDidMount()`.
 * Use `<Link />` tags to navigate between both pages.
 * The two routes on the server are `/api/movies` which returns the array of movies and `/api/movies/:id` which accepts the `id` from the movie object as a route parameter.  Both routes are meant to handle `GET` requests.

### Extra Credit
 * Add a new page `/new-movie` that displays some input fields that allow the user to post a new movie to the server.  The route on the server `/api/movies` accepts a post request and an object for the new movie as part of the body.  Make sure that it matches the format of the existing movie objects and includes a unique `id`.
