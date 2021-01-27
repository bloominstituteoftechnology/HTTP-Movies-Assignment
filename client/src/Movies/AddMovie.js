import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metaScore: "",
    stars:[],
    starText:''
  };
  
const AddForm = props => {
 
  const [movie, setMovie] = useState(initialMovie);
  const { id } = useParams();
  const { push } = useHistory();

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [ev.target.name]: value,
    });
  };


  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:5000/api/movies/`, movie)
      .then((res) => {
        props.setMovieList(res.data);
        push(`/api/movie-list/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleStar = e => {
    e.preventDefault();
    setMovie({
        ...movie,
        stars: [...movie.stars, movie.starText],
    })
  }

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
          value={movie.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
          value={movie.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <div className="baseline" />

       <label>
           Stars: {movie.stars.join(', ')}
           <input
          type="text"
          name="starText"
          onChange={changeHandler}
          placeholder="star"
          value={movie.starText}
        />
        <button  onClick={handleStar}>More Stars</button>
       </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default AddForm;
