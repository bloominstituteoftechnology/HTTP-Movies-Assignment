import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateMovie = props => {
  console.log(props);

  const [movie, setMovie] = useState({});
  const params = useParams();
  const history = useHistory();

  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({ ...movie, [e.target.name]: value });
    if (e.target.name === "stars") {
      setMovie(prevData => ({
        ...prevData,
        [e.target.name]: e.target.value.split(",") // split them to an array so we can map over them later in handle submit
      }));
      console.log(e.target.value);
    } else {
      setMovie(prevData => ({ ...prevData, [e.target.name]: e.target.value }));
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err));
  }, [params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, movie)
      .then(res => history.push("/"))
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={e => changeHandler(e)}
          placeholder="Title"
          value={movie.title}
        />
        <input
          type="text"
          name="director"
          onChange={e => changeHandler(e)}
          placeholder="Director"
          value={movie.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={e => changeHandler(e)}
          placeholder="Metascore"
          value={movie.metascore}
        />
        <input
          type="text"
          name="stars"
          onChange={e => changeHandler(e)}
          placeholder="Stars"
          value={movie.stars}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
