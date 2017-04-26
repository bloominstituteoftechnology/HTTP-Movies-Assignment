# Routing

Topics:

 * React Router
 * componentDidMount
 * RouteProvider as Route
 * Switch
 * Link


## Project Description

### Initialize Project
  * Clone the project.
  * Run the server using `node server.js`
  * In a separate folder create your project.  Install the following packages `redux`, `react-redux`, `redux-promise`, `react-router-dom`, and `prop-types`.
  * Set up your router to serve two pages.
  * Your home page should retrieve a list of movies from the server and display them.
  * When a user clicks on a movie title they should be taken to a second page that displays more info about each movie.


### Notes/Hints
 * Dispatch the action to retrieve the list of movies from inside of `componentDidMount`.
 * Use `<Link />` tags to navigate between both pages.
 * The two routes on the server are `/movies` which returns the array of movies and `/movies/:id` which accepts the `id` from the movie object as a query parameter.  Both routes are meant to handle `GET` requests.
