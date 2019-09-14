import React, {useEffect} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    useEffect(()=>{
        const id = props.match.params.id;
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>console.log(res))
        .catch(err=>console.log(err));
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