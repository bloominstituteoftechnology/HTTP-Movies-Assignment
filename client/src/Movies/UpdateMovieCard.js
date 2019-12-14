import React, { useState, useEffect } from "react";
import axios from "axios";

// const initialItems = {
//   id: 5,
//   title: "Tombstone",
//   director: "George P. Cosmatos",
//   metascore: 89,
//   stars: ["Kurt Russell", "Bill Paxton", "Sam Elliot"]
// };

const UpdateMovieCard = props => {
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: 0,
    stars: []
  });
  const id = props.match.params.id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .then(res => console.log("res", res.data))
      .catch(err => console.log(err));
  }, []);

  const changeHandler = e => {
    e.preventDefault();
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res);
        setMovie(res.data);
        props.history.push(`/movies/${movie.id}`);
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <div className="movie-card">
      <h1>Update Movie Card!!!</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={changeHandler}
        />{" "}
        <br />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={changeHandler}
        />
        <br />
        <input
          type="text"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={changeHandler}
        />
        <br />
        <input
          type="text"
          name="stars"
          placeholder="stars"
          value={movie.stars}
          onChange={changeHandler}
        />
        <br />
        <button> Submit </button>
      </form>
    </div>
  );
};
//   const handleChange = e => {
//     setMovie({
//       ...movie,
//       [e.target.name]: e.target.value
//     });
//     console.log(movie);
//   };

//   const handleSubmit = e => {
//     e.preventDefault();

//     const movieFormatter = {
//       ...movie,
//       stars: movie.stars.split(", ")
//     };

//     axios.put(
//       `http://localhost:5000/api/movies/${props.match.params.id}`,
//       movieFormatter
//     )
//       .then(reponse => {
//         console.log(reponse);
//         document.querySelector("form").reset();
//         props.history.push("/");
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="movie-card">
//       <p>
//         Fill out the form here to update a movie, if adding more then one star
//         separate each star with a comma followed by a space
//       </p>

//       <form onSubmit={handleSubmit}>
//         <input placeholder="Movie Name" name="title" onChange={handleChange} />
//         <input placeholder="Director" name="director" onChange={handleChange} />
//         <input
//           placeholder="Metascore"
//           name="metascore"
//           onChange={handleChange}
//         />
//         <input placeholder="Stars" name="stars" onChange={handleChange} />
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

export default UpdateMovieCard;
