import React from 'react';
import UpdateMovieForm from './UpdateMovie';

const UpdateMoviePage = (props) => {
    return (
        <div>
            <UpdateMovieForm setRefresh={props.setRefresh}/>
        </div>
    )
}

export default UpdateMoviePage;