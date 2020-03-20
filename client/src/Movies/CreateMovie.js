import React, { useState } from "react";
import axios from "axios";

const AddMovie = props => {
  const newObj = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };
  const [newFilm, setNewFilm] = useState(newObj);

  const [previewState, setPreviewState] = useState(false);

  const handleChange = e => {
    setNewFilm({ ...newFilm, [e.target.name]: e.target.value });
  };

  const handlePreview = e => {
    e.preventDefault();
    setNewFilm({
      ...newFilm,
      stars: newFilm.stars.split(", "),
      id: Date.now()
    });
    setPreviewState(true);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (previewState) {
      axios
        .post(`http://localhost:5000/api/movies`, newFilm)
        .then(res => {
          props.history.push("/");
        })
        .catch(err => {
          console.log("Error: ", err);
        });
    }
  };
  return (
    <div className="addMovie">
      <header>
        <h1>Add a new movie!</h1>
        <p>Simply fill out the form below, and voila!</p>
      </header>
      <form onSubmit={previewState ? handleSubmit : handlePreview}>
        <h1>
          Title:{" "}
          {previewState ? (
            newFilm.title
          ) : (
            <input
              type="text"
              name="title"
              value={newFilm.title}
              placeholder="Title"
              onChange={handleChange}
            />
          )}
        </h1>
        <p>
          Director:{" "}
          {previewState ? (
            newFilm.director
          ) : (
            <input
              type="text"
              name="director"
              value={newFilm.director}
              placeholder="Director"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Metascore:{" "}
          {previewState ? (
            newFilm.metascore
          ) : (
            <input
              type="text"
              name="metascore"
              value={newFilm.metascore}
              placeholder="Metascore"
              onChange={handleChange}
            />
          )}
        </p>
        <p>
          Stars:{" "}
          {previewState ? (
            newFilm.stars
          ) : (
            <>
              <input
                type="text"
                name="stars"
                value={newFilm.stars}
                placeholder="Star, Star, Star"
                onChange={handleChange}
              />
              <span>* Please separate stars by a comma and space *</span>
            </>
          )}
        </p>
        <button type="submit">
          {previewState ? "Commit Changes" : "Preview Changes"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
