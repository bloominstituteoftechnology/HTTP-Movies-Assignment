import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const initialFormValues = {
  id: null,
  title: "",
  director: "",
  metascore: "",
  stars: [],
};

const UpdateMovie = (props) => {
  const { push } = useHistory();
  const params = useParams();

  const [formValues, setFormValues] = useState(initialFormValues);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        console.log(res);
        setFormValues(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFormChange = (e) => {
    e.persist();
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formValues: ", formValues);
    axios
      .put(`http://localhost:5000/api/movies/${params.id}`, formValues) //make id template literals
      .then((res) => {
        //now set state to updated list and push history to /movies/id
        setFormValues(initialFormValues);
        props.getMovieList();
        props.history.push(`/`); //change id template literal
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div>
      <div>
        <h3>Edit Movie</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Title
            <input
              type="text"
              name="title"
              value={formValues.title}
              placeholder="title"
              onChange={handleFormChange}
            />
          </label>
          <label>
            Director
            <input
              type="text"
              name="director"
              value={formValues.director}
              placeholder="director"
              onChange={handleFormChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="metascore"
              value={formValues.metascore}
              placeholder="metascore"
              onChange={handleFormChange}
            />
          </label>
          <label>
            <input
              type="text"
              name="stars"
              value={formValues.stars}
              placeholder="stars"
              onChange={handleFormChange}
            />
          </label>
          <button>Submit Changes</button>
        </form>
      </div>
    </div>
  );
};
export default UpdateMovie;
