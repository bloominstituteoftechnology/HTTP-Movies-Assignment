import React, { useState } from 'react';
import axios from 'axios';


const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const AddMovie = () => {
    const [formValues, setFormValues] = useState(initialState);

    const handleChanges = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value })
    };

    const handleSubmit = event => {
        event.preventDefault();

        const newMovie = {
            ...formValues, stars: formValues.stars.split(',')
        };

        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then(response => console.log(response))
            .catch(error => console.log(error))
    };

    return (
        <div>
            <form className='addMovie' onSubmit={handleSubmit}>
                <div className='inputItem'>
                    <input 
                        type='text'
                        name='title'
                        value={formValues.title}
                        placeholder='Title'
                        onChange={handleChanges}
                    />
                </div>
                <div className='inputItem'>
                    <input 
                        type='text'
                        name='director'
                        value={formValues.director}
                        placeholder='Director'
                        onChange={handleChanges}
                    />
                </div>
                <div className='inputItem'>
                    <input 
                        type='text'
                        name='metascore'
                        value={formValues.metascore}
                        placeholder='Metascore'
                        onChange={handleChanges}
                    />
                </div>
                <div className='inputItem'>
                    <input 
                        type='text'
                        name='stars'
                        value={formValues.stars}
                        placeholder='Stars (seperated by ,)'
                        onChange={handleChanges}
                    />
                </div>
                <button className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddMovie;