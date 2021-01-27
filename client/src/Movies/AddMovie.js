import axios from 'axios';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
};

const AddForm = () => {
    const [formData, setFormData] = useState(initialState)
    const {push} = useHistory();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const newMovie = {
            ...formData, stars: formData.stars.split(',')
        };
        axios
            .post('http://localhost:5000/api/movies', newMovie)
            .then( res => {
                setFormData(initialState);
                push('/')
            })
    }

    return(
        <div className='updateInput'>
            <form onSubmit={handleSubmit}>
                <input value={formData.title} onChange={handleChange} name='title' type='text'/><br/>
                <br/>
                <input value={formData.director} onChange={handleChange} name='director' type='text'/><br/>
                <br/>
                <input value={formData.metascore} onChange={handleChange} name='metascore' type='text' /><br/>
                <br/>
                <input value={formData.stars} onChange={handleChange} name='stars' type='text'/>
                <br/>
                <br/>
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddForm; 