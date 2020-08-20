step 1.) build an edit movie form to render on the /update-move/:id path 
    a.] UpdateMovie will be a function component, with useState for managing form values

step 2.) Build a route for the new form component, path="/update-movie/:id" 

step 3.) Add an edit button in Movie.js to navigate to the update movie form 
    a.] import useHistory hook into Movie.js and destructure the history object 
    b.] add an anonymous onClick function on the edit button, using the history object to navigate to the update form. 

step 4.) Set up the form to pre-populate with the values of the movie we want to edit 
    a.] pull in useParams for the movie id 
    b.] useEffect hook to GET the movie info, console.log the response on the initial run -> received an object with the singular movie data 
    c.] use setMovie to set the form initial state to the movie response data ✅ works

step 5.) Make a submit handler for editing the movie fields 
    a.] Declare and define a change handler for the input forms using setMovies
    b.] in UpdateForm.js declare handleSubmit function 
    c.] the endpoint being his is "/api/movies/:id", put request is sent with the item being edited (movie)

** question : how can I pre-populate the fields using params instead? Movie.js is already doing a get request, so I should be able to pull from there, right? ** 
** hit roadblock here so moved on to adding the AddMovie.js file and form

step 6.) AddMovie.js created for adding a new movie to the list, it is a function component with a form 
    a.] Set initialState and used useState to set it 
    b.] pull in useHistory to MOVIELIST.JS to navigate to the add movie form via a button (add movie) ✅ works
    c.] add functionality to the form. Handle change helper for form values

step 7.) On submit we will utilize the .post endpoint and add a new movie to the array(the movie list)
    a.] axios.post with newMovie, add dependency array to movie list to 'watch' for state changes. and passed the setMovieList function to AddMovie
    added this to the useEffect on App.js
            
            useEffect(() => {
            getMovieList();
            }, [movieList]);

    and passed the setMovieList functionality to AddMovie through it's route

            <Route path="/add-movie">
                <AddMovie setMovieList={setMovieList} /> 
            </Route>
 
    b.] on success (inside the submit handler) navigate out of the add movie form back to the movie list 

step 8.) Add a delete button to the movie file. 
    a.] Add button in form, with a click handler -> handleDelete 
    b.] handleDelete makes an axios.delete request 


SH NOTES: 

- need update function to set state? 