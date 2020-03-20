import React, {useState} from 'react';

const  newMovie = {
    id: "",
    title: "", 
    director: "",
    metascore: 0,
    stars: [],
};
export default const UpdateForm = () => {
    const [movie, setMovie] = useState(newMovie);

    const handleChange = e => {
        e.preventDefault();
        setMovie({
            ...movie,
            [e.target.name]:e.target.value
        })
        
    }
    return (
        <form>
            <input type="text" 
                name="title"
                placeholder="Movie Title"
                value={}
                onChange={}
            />
            <input type="text" 
                name="director"
                placeholder="Director"
                value={}
                onChange={}
            />
            <input type="text"
                name="metaScore"
                placeholder= "MetaScore"
                value={}
                onChange={}
            />
            <button type="submit" onClick={}>Add Movie</button>
            <button type="submit" onClick={}>Delete Movie</button>

        </form>
    )

}