import React, { useState } from "react";
import axios from "axios";
import CreatableSelect from "react-select/creatable";
import { useHistory } from "react-router-dom";

const AddMovie = (props) => {
  const history = useHistory();
  const starOptions = [
    { value: "Harrison Ford", label: "Harrison Ford" },
    { value: "Danny Devito", label: "Danny Devito" },
    { value: "Issa Rae", label: "Issa Rae" },
  ];
  const [formInputs, setFormInputs] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: [],
  });
  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };
  const handleSelectChange = (newValue, actionMeta) => {
    const newStars = newValue.map((value) => value.value);
    setFormInputs({ ...formInputs, stars: newStars });
  };
  const handleSubmit = (e) => {
    axios
      .post(`http://localhost:5000/api/movies`, formInputs)
      .then((res) => {
        setFormInputs({
          title: "",
          director: "",
          metascore: 0,
          stars: [],
        });
        history.push("/");
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="movie-card">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Title: </label>
        <input
          type="text"
          name="title"
          value={formInputs.title}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">Director: </label>
        <input
          type="text"
          name="director"
          value={formInputs.director}
          onChange={handleChange}
        />
        <br />
        <br />
        <label htmlFor="">Metascore: </label>
        <input
          type="text"
          name="metascore"
          value={formInputs.metascore}
          onChange={handleChange}
        />
        <br />
        <br />
        <CreatableSelect
          isMulti
          onChange={handleSelectChange}
          options={starOptions}
          getOptionLabel={(option) => option.value}
        />
        <div className="save-button" onClick={handleSubmit}>
          Save Movie
        </div>
      </form>
    </div>
  );
};

export default AddMovie;
