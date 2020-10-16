import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const UpdateForm = ({ movieList, setMovieList }) => {
  const [formValues, setFormValues] = useState();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, formValues)
      .then((res) => {
        setMovieList([...movieList, res.data]);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {!formValues ? (
        "Loading..."
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="director"
            value={formValues.director}
            onChange={handleChange}
          />
          <input
            type="number"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
          <button>Update Movie</button>
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
