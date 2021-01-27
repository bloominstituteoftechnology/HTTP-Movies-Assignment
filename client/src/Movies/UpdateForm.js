import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialValues ={
    title: '',
    director: '',
    metascore: '',
    stars: []
}


const UpdateForm = (props) =>{
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialValues);
    const { id } = useParams();

    useEffect(()=>{
        axios
          .get(`http://localhost:5000/api/${id}`)
          .then(res=>{
            setMovie(res.data);
          })
          .catch(err=>{
            console.log(err);
          });
      }, []);

      const changeHandler = (evt) =>{
          evt.persist();
          let value = evt.target.value;
          if(evt.target.name === 'metascore'){
              value = parseInt(value, 10)
          }

          setMovie({
              ...movie,
              [evt.target.name]: value
        });
      }

      const handleSubmit = (evt) =>{
          evt.preventDefault();
          axios.put(`http://localhost:5000/api/${id}`, movie)
          .then((res) =>{
              props.setMovie(res.data);
              push(`/`)
          })
          .catch((err) =>{
              console.log(err)
          })
      }

    return(
        <div>
            <h2>Edit Movie</h2>
            <form onClick={handleSubmit}>

                <input 
                    type='text'
                    name='title'
                    placeholder='Title'
                    value={movie.title}
                    onChange={changeHandler}
                />

                <input 
                    type='text'
                    name='director'
                    placeholder='Director'
                    value={movie.director}
                    onChange={changeHandler}
                />

                <input 
                    type='text'
                    name='metascore'
                    placeholder='Metascore'
                    value={movie.metascore}
                    onChange={changeHandler}
                />

                <input 
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    value={movie.stars}
                    onChange={changeHandler}
                />

                <button >Update</button>

            </form>
        </div>
    )
};

export default UpdateForm;