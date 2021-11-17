import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [editing, setEditing] = useState(false)
  const [movie, setMovie] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    director: '',
    metascore: 0,
    
  })
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data) 
        setMovie(res.data)
      })
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const onEdit = () => {
    setEditing(!editing)
  }

  const onChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  const onSubmit = (e) => {
    const movieEdit = {id: params.id, title: editForm.title, director: editForm.director, metascore: editForm.metascore, stars: movie.stars}
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${params.id}`, movieEdit)
    .then(res => console.log(res))
    .catch(err => console.log(err))

  } 

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={onEdit}>Edit</button>
      {
        editing && 
        
        <form onSubmit={onSubmit}>
          <label>Title:
            <input 
            name='title'
            placeholder={movie.title}
            value={editForm.title}
            onChange={onChange}
            />
          </label>
          <label>Director:
            <input 
            name='director'
            placeholder={movie.director}
            value={editForm.director}
            onChange={onChange}
            />
          </label>
          <label>Metascore:
            <input 
            name='metascore'
            placeholder={movie.metascore}
            value={editForm.metascore}
            onChange={onChange}
            />
          </label>
          <button>Save Edit</button>
        </form>
      }
    </div>
  );
}

export default Movie;
