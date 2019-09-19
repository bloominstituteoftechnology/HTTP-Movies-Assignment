import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieForm = props => {
    const [movie, setMovie] = useState(initialMovie); // set state to blank format/syntax of movie object

    const { match, movies } = props; // pull these in as they'll be needed in the effect hook

    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = movies.find(movie => `${movie.id}` === id); // template literal or var types won't match
        
        if (movieToUpdate) { // If we don't write this "if statement," code will run before axios call finishes, creating a bug
            console.log(movieToUpdate);
            setMovie(movieToUpdate);
        }
    }, [match, movies]); // Without a dependency array containing relevant props, code will run and run inside console (infinite loop)

    
}