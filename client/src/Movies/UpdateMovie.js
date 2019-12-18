import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovie = props => {
  const [update, setUpdate] = useState(initialMovie);
  useEffect(() => {
      console.log(props.match.params.id)
      console.log(update)
      axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        setUpdate(res.data);
      })
      .catch(err => console.log(err));
    // const movieToEdit = props.movies.find(
    //   e => `{e.id}` === props.match.params.id
    // );
    // console.log(props.movies, movieToEdit);
    // if (movieToEdit) {
    //   setUpdate(movieToEdit);
    // }
  }, [props.match.params.id]);

  const changeHandler = e => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${update.id}`, update)
      .then(res => {
        // setUpdate(res.data)
        props.history.push(`/movies/${update.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={changeHandler}
          value={update.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          placeholder="Director"
          onChange={changeHandler}
          value={update.director}
        />
        <div className="baseline" />

        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          onChange={changeHandler}
          value={update.metascore}
        />
        <div className="baseline" />

        <input
          type="text"
          name="stars"
          placeholder="Stars"
          onChange={changeHandler}
          value={update.stars}
        />
        <div className="baseline" />

        <button>Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;
