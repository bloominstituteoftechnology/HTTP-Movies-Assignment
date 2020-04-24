import React from 'react'
import {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
}



const EditForm = props =>{
    const [movieForm, setMovieForm] = useState(initialState)
    const {push} = useHistory();
    const { id } = useParams();

    useEffect(()=>{
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res=>{
            console.log(res, 'get request data')
            setMovieForm(res.data)
            //setMovieForm({
            //id: res.data.id,
            //title: res.data.title,
           // director: res.data.director,
            //metascore: res.data.metascore,
            //stars: res.data.stars.split(',')
            //})
        })
        .catch(err=>console.log(err))
    },[id])

    const handleChanges = e => {
        e.preventDefault();
        let value = e.target.value;
       // if (e.target.name === 'metascore') {
        //  value = parseInt(value, 10);
       // }
        if(e.target.name === 'stars'){
            value = e.target.value.split(',')

        }
        setMovieForm({
          ...movieForm,
          [e.target.name]: value
        });

      };

      console.log(movieForm)

      const handleSubmit = e => {
        e.preventDefault();
        //const newStars =  movieForm.stars.split(',')
        //const updatedMovie = {
       //     title: movieForm.title,
        //    director: movieForm.director,
        //    metascore: movieForm.metascore,
        //    stars: newStars
        //}
       // console.log(updatedMovie, 'new movie data')
        axios
          .put(`http://localhost:5000/api/movies/${id}`, movieForm)
          .then(res => {
            // res.data
            
            console.log(res, 'put response')
            props.setMovieList([...props.movieList, res.data]);
            props.setIncrement(props.increment + 1)
            push(`/`);
            
            // res.data ==> just updated item object
          })
          .catch(err => console.log(err));
      };


    return(
        <form onSubmit = {handleSubmit}>
            <input
            type = 'text'
            name = 'title'
            placeholder = 'title'
            onChange = {handleChanges}
            value = {movieForm.title}
            />
            <input
            type = 'text'
            name = 'director'
            placeholder = 'director'
            onChange = {handleChanges}
            value = {movieForm.director}
            />
            <input
            type = 'text'
            name = 'metascore'
            placeholder = 'metascore'
            onChange = {handleChanges}
            value = {movieForm.metascore}
            />
            <textarea
            type = 'text'
            name = 'stars'
            placeholder = 'stars'
            onChange = {handleChanges}
            value = {movieForm.stars}
            />
            <button type = 'submit'>submit</button>
        </form>
    )
}
export default EditForm;
