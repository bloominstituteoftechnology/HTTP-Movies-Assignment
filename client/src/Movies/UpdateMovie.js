import React, {useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    useEffect(()=>{

    },[])

    const handleSubmit = e =>{
        e.preventDefault();
        console.log('submit handler');
        console.log(props);
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input placeholder="Title" />
            <input placeholder="Director" />
            <input placeholder="Metascore" />
            <input placeholder="Stars" /> 
            {/* Separate stars with commas the split into array? */}
            <button>Update Movie</button>
        </form>
     );
}
 
export default UpdateMovie;