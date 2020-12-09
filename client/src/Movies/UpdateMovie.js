import React from 'react'

function UpdateMovie() {
    return (
        <div>
        <button>Redirect to new Movie</button>
        </div>
    )
}

// do axios call in this component, put request
// Add a button in the movie component that routes you to your new route with the movies's id as the URL param
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

export default UpdateMovie
