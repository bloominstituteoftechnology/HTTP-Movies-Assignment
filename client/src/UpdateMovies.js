import React, {useEffect, useState} from "react";
import axios from "axios";

const UpdateMovies = props => {
  const { id } = props.match.params;
  const movieStuff = {
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  };
const [updateMovie, setUpdateMovie] = useState(movieStuff);
  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then(res => {
      console.log(res.data, "the .get worked");
      setUpdateMovie(res.data);
    });
  }, [id]);

 const handleChange = event => {
    console.log("changes were handled");
    setUpdateMovie({ ...updateMovie, [event.target.name]: event.target.value });
  };

  const handleStars = event => {
    setUpdateMovie({
      ...updateMovie,
      stars: [event.target.value]
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${id}`, updateMovie)
      .then(res => {
        console.log("we got the movie!", res);
        setUpdateMovie(movieStuff);
        props.history.push(`/movies/${id}`);
      })
      .catch(err => {
        console.log("Err");
      });
  };

  return (
    <div>
      <h2>Update Your Saved Movie Details</h2>
      <form onSubmit={handleSubmit}>
        <label>Title: </label>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={updateMovie.title}
          onChange={handleChange}
        />
        <label>Stars: </label>
        <input
          type="text"
          name="stars"
          placeholder="Stars"
          value={updateMovie.stars}
          onChange={handleStars}
        />
        <label>Director: </label>
        <input
          type="text"
          placeholder="Director"
          name="director"
          value={updateMovie.director}
          onChange={handleChange}
        />
        <label>Meta-Score: </label>
        <input
          type="text"
          placeholder="Meta-score"
          name="metascore"
          value={updateMovie.metascore}
          onChange={handleChange}
        />

        <button>Update Movie Info</button>
      </form>
    </div>
  );
};

export default UpdateMovies;
