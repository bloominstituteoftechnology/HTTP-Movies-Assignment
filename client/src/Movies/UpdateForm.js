import React from 'react';

const UpdateForm = props => {
    console.log('from UpdateForm: props', props);

    return (
        <form className='update-form'>
            <label htmlFor='title' className='label'>Title</label>
            <input 
                className='input'
                type='text'
                name='title'
                value=''
                placeholder='Title' />
            <label htmlFor='director' className='label'>Director</label>
            <input 
                className='input'
                type='text'
                name='director'
                value=''
                placeholder='Director' />
            <label htmlFor='metascore' className='label'>Meta Score</label>
            <input 
                className='input'
                type='number'
                name='metascore'
                value=''
                placeholder='Metascore' />
            <label htmlFor='stars' className='label'>Stars</label>
            <input 
                className= 'input'
                type='text'
                name='stars'
                value=''
                placeholder='Stars' />
            <button className='edit-movie-btn'>Submit Edit</button>
        </form>
    )
};

export default UpdateForm;