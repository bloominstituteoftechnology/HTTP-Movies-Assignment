import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const MovieForm = props => {
    console.log(props);
    const [movie, setMovie] = useState(initialMovie); // set state to blank format/syntax of movie object

    const { match, movies } = props; // pull these in as they'll be needed in the effect hook

    const handleChange = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'rating') value = Number(value) // convert string to number if the input is labeled as a rating
        
        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    useEffect(() => {
        const id = match.params.id;
        const movieToUpdate = movies.find(movie => movie.id == id); // template literal or var types won't match
        
        if (movieToUpdate) { // If we don't write this "if statement," code will run before axios call finishes, creating a bug
            console.log('Is it this?', movieToUpdate);
            setMovie(movieToUpdate);
        }
    }, [match, movies]); // Without a dependency array containing relevant props, code will run and run inside console (infinite loop)

    const handleSubmit = e => {
        // console.log('Clicked');
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                props.history.push(`/movies/${movie.id}`); // redirect to movie page after edit -- DO THIS ONE BEFORE SET!!!!!
                props.setMovie(res.data);
            })
            .catch(err => console.log(err.response))
    }

    const addStar = e => {
        e.preventDefault();
        setMovie({...movie, stars: [...movie.stars, ""]});
    };

    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, index) => {
            return index === index ? e.target.value : star;
        })})
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="title"
                    value={movie.title}
                    onChange={handleChange}
                    placeholder="Movie name..."
                />
                <input 
                    type="text"
                    name="director"
                    value={movie.director}
                    onChange={handleChange}
                    placeholder="Movie director..."
                />
                <input 
                    type="number"
                    name="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                    placeholder="Movie metascore..."
                />
                {movie.stars && movie.stars.map((star, index) => {
                    return <input type="text"
                                  name="star"
                                  key={index}
                                  value={star}
                                  onChange={handleStar(index)}
                            />
                })}
                <button onClick={addStar}>Add Star</button>
                <button type="submit">Update Movie</button>
            </form>
        </div>
    )
}

export default MovieForm;