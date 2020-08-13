import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialChange = {
    title: '',
    director: '',
    metascore: '',
    stars: '',
};

const UpdateForm = () => {
    // console.log('from UpdateForm: props', props);
    const [change, setChange] = useState(initialChange);
    const { id } = useParams();
    const history = useHistory();
    console.log('from updateForm: useParams', id);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setChange(res.data);
                console.log('UpdateForm: movies/id: res', res)
            })
            .catch(err => console.error('UpdateForm: movies/id failed: err', err.message))
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, change)
            .then(res => {
                console.log('UpdateForm: submit success:res', res);
                setChange(res.data);
                history.push('/movies');
            })
            .catch(err => console.error('UpdateForm: submit failed:err', err))
    }



    const handleChanges = e => {
        setChange({
            ...change,
            [e.target.name]: e.target.value
        })

    }



    return (
        <form className='update-form' onSubmit={handleSubmit}>
            <label htmlFor='title' className='label'>Title</label>
            <input
                className='input'
                type='text'
                name='title'
                value={change.title}
                placeholder='Title'
                onChange={handleChanges} />
            <label htmlFor='director' className='label'>Director</label>
            <input
                className='input'
                type='text'
                name='director'
                value={change.director}
                placeholder='Director'
                onChange={handleChanges} />
            <label htmlFor='metascore' className='label'>Meta Score</label>
            <input
                className='input'
                type='number'
                name='metascore'
                value={change.metascore}
                placeholder='Metascore'
                onChange={handleChanges} />
            <label htmlFor='stars' className='label'>Stars</label>
            <input
                className='input'
                type='text'
                name='stars'
                value=''
                placeholder='Stars'
                onChange={handleChanges} />
            <button className='edit-movie-btn'>Submit Edit</button>
        </form>
    )
};

export default UpdateForm;