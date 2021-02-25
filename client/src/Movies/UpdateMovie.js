import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialValue = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const UpdateMovie = props => {
    const [movieItem, setMovieItem] = useState(initialValue);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setMovieItem(res.data);
        })
        .catch()
    }, []);

    const handleChange = e => {
        setMovieItem({
            ...movieItem,
            [e.target.name]: e.target.value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movieItem)
        .then(() => {
            axios
            .get('http://localhost:5000/api/movies')
            .then(res => {
                props.setMovieList(res.data);
                push('/');
            })
        })
        
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <div className='updateMovie'>
            <h2>Update the Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='Insert Movie Title'
                value={movieItem.title}
                />
                <input 
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='Movie Director'
                value={movieItem.director}
                />
                <input 
                type='text'
                name='metascore'
                onChange={handleChange}
                placeholder='Insert metascore'
                value={movieItem.metascore}
                />
                <button className='addButton'>Add Movie</button>
            </form>
        </div>
    )
}
export default UpdateMovie;