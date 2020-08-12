import React, {useState, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import axios from "axios";

const UpdateMovieForm = () => {
  const [movie, setMovie] = useState({});

  const {id} = useParams();
  const {goBack} = useHistory();

  const fetchMovieById = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("SR: UpdateMovieForm.js: submit sucess: res: ", res.data);
        setMovie(res.data);
      })
      .catch((err) => {
        console.error(
          "SR: UpdateMovieForm.js: submit failed: err ",
          err.message
        );
      });
  };

  const putMovie = (update) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, update)
      .then((res) => {
        setMovie(res.data);

        goBack();
      })
      .catch((err) => {
        console.error(
          "SR: UpdateMovieForm.js: submit failed: err ",
          err.message
        );
      });
  };

  useEffect(() => {
    fetchMovieById(id);
  }, [id]);

  const handleChanges = (e) => {
    e.persist();
    if (e.target.name === "metascore") {
      e.target.value = parseInt(e.target.value);
    }

    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
      stars: e.target.value.split(","),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    putMovie(movie);
  };

  return (
    <>
      <h2>Update Movie Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChanges}
            placeholder="Title"
          />
        </div>

        <div>
          <input
            type="text"
            name="director"
            value={movie.director}
            onChange={handleChanges}
            placeholder="Director"
          />
        </div>

        <div>
          <input
            type="number"
            name="metascore"
            value={movie.metascore}
            onChange={handleChanges}
            placeholder="Metascore"
          />
        </div>

        <div>
          <input
            type="text"
            name="stars"
            value={movie.stars}
            onChange={handleChanges}
            placeholder="Stars"
          />
        </div>

        <button>Update Movie</button>
      </form>
    </>
  );
};

export default UpdateMovieForm;
