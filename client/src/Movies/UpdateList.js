import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const UpdateList = ({ movieList, setMovieList }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    id: id,
    metascore:"",
    stars: []
  });
  const { title, director, metascore, stars } = movie;
  const history = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data)})
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(id);
  }, [id]);

  const handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(res => {
        console.log(res.data)
        setMovieList({
          ...movieList,
          movie
        })
        
        window.location = "/"
      })
  };

  return (
    <div className="movie-card">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <div className="movie-title">
          Title:
        </div>
        <input
          type="text"
          name="title"
          onChange={handleChanges}
          value={title}
        />
        <div className="movie-director">
          Director:
        </div>
        <input
          type="text"
          name="director"
          onChange={handleChanges}
          value={director}
        />
        <div className="movie-metascore">
          Metascore:
        </div>
        <input
          type="number"
          name="metascore"
          onChange={handleChanges}
          value={metascore}
        />
        <div></div>
        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateList;