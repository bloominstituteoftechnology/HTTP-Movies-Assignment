import React from 'react'

function UpdateMovieForm(props) {
    return(
        <div>
            <form>
                <input type="text" name="movie-title" placeholder="Movie Title"/>
                <input type="text" name="movie-director" placeholder="Movie Director"/>
                <input type="number" name="movie-metascpre" placeholder="Metascore"/>
                <input type="text" name="movie-actors" placeholder="Actors"/>
            </form>
        </div>
    )
}