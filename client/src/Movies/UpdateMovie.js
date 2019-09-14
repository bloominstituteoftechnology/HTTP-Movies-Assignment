import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  });

  useEffect(() => {
    //   console.log(props.history);
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie({
          id: id,
          title: res.data.title,
          director: res.data.director,
          metascore: res.data.metascore,
          stars: res.data.stars
        });
      })

      .catch(err => console.log(err));
  }, []);

  const handleChange = e => {

    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });

    // console.log(movie);
  };


  const handleSubmit = e => {
    e.preventDefault();
    if(movie.title != "" && movie.director != "" && movie.stars != "" && movie.metascore != ""){

            console.log(movie)
          console.log("submit handler");
        if(typeof(movie.stars)=="string"){

            const stars = movie.stars.split(',');

            const newMovie = {
                ...movie,
                stars: stars
            }

            axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, newMovie)
            .then(res=>{
                // console.log(res);
                props.history.push('/')
            })
            .catch(err=>{
                console.log(err)
            });

            
        } else {
            // console.log('running else');
            axios
            .put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
            .then(res=>{
                // console.log(res);
                props.history.push('/')
            })
            .catch(err=>{
                console.log(err)
            });
        }
    

    }
    
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={movie.title}
        name="title"
        placeholder="Title"
      />
      <input
        onChange={handleChange}
        value={movie.director}
        name="director"
        placeholder="Director"
      />
      <input
        onChange={handleChange}
        value={movie.metascore}
        name="metascore"
        placeholder="Metascore"
      />
      <textarea onChange={handleChange}
        value={movie.stars}
        name="stars"
        placeholder="Stars - Seperate by commas"/>
      {/* <input
        
      /> */}
      {/* Separate stars with commas the split into array? */}
      <button>Update Movie</button>
    </form>
  );
};

export default UpdateMovie;
