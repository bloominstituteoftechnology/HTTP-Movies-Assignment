import React from 'react';
import UpdateForm from './Movies/UpdateForm';

const UpdateMoviePage = (props) => {
    console.log(props)
    return (
        <div>
            <UpdateForm setRefresh={props.setRefresh}/>
        </div>
    )
}

export default UpdateMoviePage;