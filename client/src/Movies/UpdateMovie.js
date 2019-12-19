import React, {useState} from 'react';
import axios from 'axios';

const UpdateMovie = props => {
    const [movie, setMovie] = useState({id: props.match.params.id});

    const handleChange = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const movieStars = {
            ...movie,
            stars: movie.stars.split(', ')
        }
        axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movieStars)
        .then(res => {
            props.history.push('/');
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='title' onChange={handleChange} />
                <input type='text' name='director' onChange={handleChange} />
                <input type='text' name='metascore' onChange={handleChange} />
                <input type='text' name='stars' onChange={handleChange} />
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie