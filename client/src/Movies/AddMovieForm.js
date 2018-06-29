import React from 'react';

const AddMovieForm = props => {
    return (
        <form>
            <input 
                placeholder="title"
                onChange={props.change}
                name="title" 
            />
            <input 
                placeholder="director" 
                onChange={props.change}
                name="director"  
            />
            <input 
                placeholder="metascore" 
                onChange={props.change}
                name="metascore" 
            />
            <input 
                placeholder="stars" 
                onChange={props.change}
                name="stars"
            />
            <button onClick={props.addmovie}>Add</button>
        </form>
    )
}

export default AddMovieForm;