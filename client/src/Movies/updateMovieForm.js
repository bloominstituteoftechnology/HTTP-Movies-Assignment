import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const initialValue = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
}

const UpdateMovieForm = props => {
    const [movie, setMovie] = useState(initialValue);
    const {id} = useParams();
    console.log(props);

   

      useEffect(()=>{
        let dataToUpdate = props.movieList.find(e => `${e.id}`=== id);
        console.log(dataToUpdate,'data update in useEffect');
        if (dataToUpdate)  {setMovie(dataToUpdate)};
    },[props.movieList,id]);

    

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`,movie)
        .then(res => {
            console.log(res,'response put then');
            const updatedMovie = props.movieList.map(v => {
                if (v.id === res.data.id){
                    return res.data;
                } else {
                    return v;
                }
            });
            props.setMovieList(updatedMovie);

            
            props.history.push('/');
            console.log(res)})
        .catch(err => console.log(err,'error posting data'))
    }

    const handleChange = e => {
       e.persist(); 
       let starsvalue = e.target.value;
       if (e.target.name === 'stars')  {starsvalue = [starsvalue] }
        
        
        setMovie({...movie, [e.target.name]: starsvalue})
      }

    return (
        <div className='edit-form'>
        <h1>Update Movie Details</h1>
        <form onSubmit= {handleSubmit}>
            <label htmlFor='title'>     
                 <input
                type='text'
                name='title'
                onChange={handleChange}
                placeholder='title'
                value={movie.title}
                />
                </label>

                <label htmlFor='director'>     
                 <input
                type='text'
                name='director'
                onChange={handleChange}
                placeholder='director'
                value={movie.director}
                />
                </label>

                <label htmlFor='metascore'>     
                 <input
                type='number'
                name='metascore'
                onChange={handleChange}
                placeholder='metascore'
                value={movie.metascore}
                />
                </label>

                <label htmlFor='stars'>     
                 <input
                type='text'
                name='stars'
                onChange={handleChange}
                placeholder='stars'
                value={movie.stars}
                />
                </label>

                <button type='submit'>Add changes</button>
                
      
        </form>

        </div>
    )
}


export default UpdateMovieForm