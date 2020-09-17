import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const MovieForm = () => {
  const params = useParams();
  const history = useHistory();
  const [movie, setMovie] = useState([]);

  const changeValues = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  const changeActors = (e) => {
    e.preventDefault();
    setMovie({
      ...movie,
      stars: e.target.value.split(","),
    });
  };

  const getMovieDetails = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getMovieDetails(params.id);
  }, [params.id]);

  const submitChanges = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then((res) => {
        console.log(res);
        history.push("/");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <form onSubmit={submitChanges}>
        <label>
          Movie Title:
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={changeValues}
          />
        </label>
        <label>
          Movie Director:
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={changeValues}
          />
        </label>
        <label>
          Movie MetaScore:
          <input
            type="numbers"
            name="metascore"
            value={movie.metascore}
            onChange={changeValues}
          />
        </label>
        <label>
          Movie Stars:
          <input
            type="text"
            name="stars"
            value={movie.stars}
            onChange={changeActors}
          />
        </label>
        <button>Submit Edits</button>
      </form>
    </div>
  );
};

export default MovieForm;
