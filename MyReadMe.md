step 1.) build an edit movie form to render on the /update-move/:id path 
    a.] UpdateMovie will be a function component, with useState for managing form values

step 2.) Build a route for the new form component, path="/update-movie/:id" 

step 3.) Add an edit button in Movie.js to navigate to the update movie form 
    a.] import useHistory hook into Movie.js and destructure the history object 
    b.] add an anonymous onClick function on the edit button, using the history object to navigate to the update form. 

step 4.) Set up the form to pre-populate with the values of the movie we want to edit 
    a.] pull in useParams for the movie id 
    b.] useEffect hook to GET the movie info, console.log the response on the initial run -> received an object with the singular movie data 
    c.] use setMovie to set the form initial state to the movie response data 

step 5.) Make a submit handler for editing the movie fields 
    a.] Declare and define a change handler for the input forms using setMovies
    b.] in UpdateForm.js declare handleSubmit function 
    c.] the endpoint being his is "/api/movies/:id", put request is sent with the item being edited (movie)

** question : how can I pre-populate the fields using params instead? Movie.js is already doing a get request, so I should be able to pull from there, right? ** 