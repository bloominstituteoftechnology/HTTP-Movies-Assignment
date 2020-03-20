import React, {useState} from 'react';

const  newMovie = {
    id: "",
    title: "",
    director: "",
    metascore: 0,
    stars: [],
};
const UpdateForm = ({movies, updateMovies}) => {
    const [movie, setMovie] = useState(newMovie);

    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = e=> {
        e.preventDefault();
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="text"
                name="title"
                placeholder="Movie Title"
                value={movie.title}
                onChange={handleChange}/>

            <input type="text" 
                name="director"
                placeholder="Director"
                value={movie.director}
                onChange={handleChange} />

            <input type="text"
                name="metascore"
                placeholder= "MetaScore"
                value={movie.metascore}
                onChange={handleChange}
            />
            <button type="submit" onClick={}>Add Movie</button>
            <button type="submit" onClick={}>Delete Movie</button>

        </form>
    )

}

export default UpdateForm;