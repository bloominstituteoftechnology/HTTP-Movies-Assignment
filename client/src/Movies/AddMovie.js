import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const initialFormValues = {
  title: "",
  director: "",
  metascore: "",
  stars: [],
  starsString: "",
};

const AddMovie = (props, { setMovieList }) => {
  const [movieValues, setMovieValues] = useState(initialFormValues);

  const { push } = useHistory();

  const handleChange = (e) => {
    setMovieValues({
      ...movieValues,
      [e.target.name]: e.target.value,
      stars: movieValues.starsString.split(", "),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title: movieValues.title,
      director: movieValues.director,
      metascore: movieValues.metascore,
      stars: movieValues.stars,
    };

    axios
      .post("http://localhost:5000/api/movies", newMovie)
      .then((res) => {
        console.log("res: ", res);
        props.setMovieList(res.data);
        props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div>
        <h3>Add Movie!</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              placeholder="title"
              name="title"
              onChange={handleChange}
              value={movieValues.title}
            />
          </label>
          <label>
            Director
            <input
              type="text"
              placeholder="director"
              name="director"
              onChange={handleChange}
              value={movieValues.director}
            />
          </label>
          <label>
            Metascore
            <input
              type="text"
              placeholder="metascore"
              name="metascore"
              onChange={handleChange}
              value={movieValues.metascore}
            />
          </label>
          <label>
            Stars
            <input
              type="text"
              placeholder="stars"
              name="starsString"
              onChange={handleChange}
              value={movieValues.starsString}
            />
          </label>
          <button>Add Movie</button>
        </form>
      </div>
    </div>
  );
};
export default AddMovie;
