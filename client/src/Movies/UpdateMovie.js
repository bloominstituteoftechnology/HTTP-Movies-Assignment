import React, {useEffect, useState} from 'react';
import axios from 'axios';

const UpdateMovie = (props) => {

    const [movie, setMovie] = useState({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: ""
    });

    useEffect(()=>{
        const id = props.match.params.id;
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            console.log(res)
            setMovie({
                id: id,
                title: res.data.title,
                director:  res.data.director,
                metascore: res.data.metascore,
                stars:  res.data.stars
            })

        })
            
            
        
        
        .catch(err=>console.log(err));
    },[])

    const handleChange = e =>{
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e =>{
        e.preventDefault();
        console.log('submit handler');
        console.log(props);
    }
    return ( 
        <form onSubmit={handleSubmit}>
            <input onChange={handleChange} value={movie.title} name="title" placeholder="Title" />
            <input onChange={handleChange} value={movie.director} name="director" placeholder="Director" />
            <input onChange={handleChange} value={movie.metascore} name="metascore" placeholder="Metascore" />
            <input onChange={handleChange} value={movie.stars} name="stars" placeholder="Stars - Seperate by commas" /> 
            {/* Separate stars with commas the split into array? */}
            <button>Update Movie</button>
        </form>
     );
}
 
export default UpdateMovie;