import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

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

  const handleStarChanges = (e) => {
    setFormValues({ ...formValues, stars: [...formValues, e.target.value] });
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

  console.log(formValues);
  return (
    <div>
      {!formValues ? (
        "Loading"
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
            type="text"
            name="metascore"
            value={formValues.metascore}
            onChange={handleChange}
          />
          {formValues.stars.map((star, index) => (
            <input
              key={index}
              type="text"
              name={index}
              value={star}
              onChange={handleStarChanges}
            />
          ))}
          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default UpdateForm;
