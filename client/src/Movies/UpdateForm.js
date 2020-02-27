import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

const FormDiv = styled.form`
    display:flex;
    margin:10px auto;
    justify-content:space-evenly;
    flex-direction: column;
    width: 40%;
    height: 4%;
`
const Input = styled.input`
    margin: 10px auto;
    border-radius:5px;
    width: 100%;
`
const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};
const UpdateForm = props => {
    console.log('Update Props ', props);
    const [movie, setMovie] = useState(initialState);
    const { id } = useParams();

    console.log('id id id: ', useParams());

    useEffect(() => {
        const movieToUpdate = props.movieList.find(film => `${film.id}` === id);
        console.log('movieToUpdate String: ', movieToUpdate);
        if (movieToUpdate) {
            setMovie(movieToUpdate);
        }
    }, [props.movieList, id]);

    const handleChanges = e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'stars') {
            value = value.split(',')
        } 
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
        
    };
    
    const handleSubmit = e => {
        e.preventDefault();
        
        axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log('this is res.data ', res.data)
            props.getMovieList(
            
            );

            props.history.push('/');
        })
        .catch(err => console.log(err));
    }
    return (
        <div>
            <FormDiv onSubmit={handleSubmit}>
                <Input
                    type='text'
                    placeholder='title'
                    name='title'
                    value={movie.title}
                    onChange={handleChanges}
                />
                <Input 
                    type='text'
                    placeholder='director'
                    name='director'
                    value={movie.director}
                    onChange={handleChanges}
                />
                <Input
                    type='text'
                    placeholder='metascore'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                />
                <Input
                    type='text'
                    placeholder='stars'
                    name='stars'
                    value={movie.stars}
                    onChange={handleChanges}
                />
                <Button type="submit" variant="contained" color="primary">Edit Movie</Button>
            </FormDiv>
        </div>
    )
}
export default UpdateForm;