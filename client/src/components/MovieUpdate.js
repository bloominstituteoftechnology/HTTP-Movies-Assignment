import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const MovieUpdate = ({ setMovieList, movieList }) => {
  const { id } = useParams();
  const [movieItem, setMovieItem] = useState(initialMovie);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log("mvlist", movieList);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("updateformprops", res);
        setMovieItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    // if (ev.target.name === "price") {
    //   value = parseInt(value, 10);
    // }
    setMovieItem({
      ...movieItem,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieItem)
      .then((res) => {
        console.log("handeSubmit", res); //returns the item you edited, most likely
        setMovieList(
          movieList.map((mv) => {
            if (mv.id == id) {
              return movieItem;
            } else {
              return mv;
            }
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={movieItem.title}
        />
        <div className="baseline" />

        {/* <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={movieItem.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={movieItem.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={movieItem.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={movieItem.shipping}
        /> */}
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default MovieUpdate;
