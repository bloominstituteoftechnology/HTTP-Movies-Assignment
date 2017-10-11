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
  * In a separate folder create your project.  Install the following packages `redux`, `react-redux`, `redux-promise`, `react-dom`, `react-router-dom`, `prop-types`, and `axios`.
  * Set up your router to serve two pages.
  * Your home page should retrieve a list of movies from the server and display them.
  * When a user clicks on a movie title they should be taken to a second page that displays more info about each movie.


### Notes/Hints
 * Dispatch the action to retrieve the list of movies from inside of `componentDidMount`.
 * Use `<Link />` tags to navigate between both pages.
 * The two routes on the server are `/movies` which returns the array of movies and `/movies/:id` which accepts the `id` from the movie object as a query parameter.  Both routes are meant to handle `GET` requests.

### Extra Credit
 * Add a new page `/new-movie` that displays some input fields that allow the user to post a new movie to the server.  The route on the server `/new-movie` accepts a post request and an object for the new movie.  Make sure that it matches the format of the existing movie objects.
