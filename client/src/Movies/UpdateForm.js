import React,{useState} from 'react';

const editData = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}

const UpdateForm = (props) =>{
    //pass an empty data in order to be able to update.
    const [movie, setMovie]= useState(editData);
    return(
        <div>
            <h1> Testing </h1>
            <form> 
                <input 
                    type="text"
                    name="name"
                    placeholder="id"
                />
            <div />
                <input 
                    type="text"
                    name="name"
                    placeholder="title"
                />
            <div />
                <input 
                    type="text"
                    name="name"
                    placeholder="director"
                />
            <div />
                <input 
                    type="text"
                    name="name"
                    placeholder="metascore"
                />
            <div />
                <input 
                    type="text"
                    name="name"
                    placeholder="stars"
                />
            <div />
                <button>Update</button>
            </form>
        </div>
    );
};
export default UpdateForm;