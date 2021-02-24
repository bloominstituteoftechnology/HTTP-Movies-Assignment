import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialValues = {
  id: "",
  title: "",
  director: "",
  metascore: null,
  stars: [],
};

const UpdateForm = (props) => {
  const { push } = useHistory();
  const [value, setValue] = useState(initialValues);
  // const id = props.match.params.id;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        setValue(res.data);
      })
      .catch((err) => {
        console.log(err, "error in update form");
      });
  }, [id]);

  const changeHandler = (ev) => {
    setValue({
      ...value,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, value)
      .then((res) => {
        // props.setValue(res.data);
        props.setMovieList(
          props.movieList.map((item) => {
            if (item.id === res.data.id) {
              return res.data;
            } else {
              return item;
            }
          })
        );
        setValue(initialValues);
        push(`/movies/${value.id}`);
        console.log(res.data, "handleSubmit");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="updateForm">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            type="text"
            name="title"
            onChange={changeHandler}
            placeholder="enter Title"
            value={value.title}
          />
        </label>
        <br></br>
        <label>
          Director
          <input
            type="text"
            name="director"
            onChange={changeHandler}
            placeholder="enter director"
            value={value.director}
          />
        </label>
        <br></br>
        <label>
          metascore
          <input
            type="number"
            name="metascore"
            onChange={changeHandler}
            placeholder="enter metascore"
            value={value.metascore}
          />
        </label>
        <br></br>
        <label>
          Stars
          <input
            type="text"
            name="stars"
            onChange={changeHandler}
            placeholder="enter stars"
            value={value.stars}
          />
        </label>
        <br></br>
        <button className="button">Update</button>
      </form>
    </div>
  );
};
export default UpdateForm;
