import React, { useState, useEffect } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const MovieUpdate = ({ setMovieList, movieList }) => {
  const { id } = useParams();
  const [movieItem, setMovieItem] = useState(initialMovie);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log("mvlist", movieList);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("Mv Update Props", res);
        setMovieItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    setMovieItem({
      ...movieItem,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieItem)
      .then((res) => {
        setMovieList(
          movieList.map((mv) => {
            if (mv.id == id) {
              console.log("Updated Movie", movieItem);
              return movieItem;
            } else {
              return mv;
            }
          })
        );
        history.push(`/`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="saved-list">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="Title"
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="Director"
        />
        <div className="baseline" />

        <input
          type="integer"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
