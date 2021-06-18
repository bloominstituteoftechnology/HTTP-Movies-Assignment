import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const MovieUpdateForm = (props) => {
    
    const [movie, setMovie] = useState(initialState)
    const { id } = useParams()
   

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => { console.log(res.data)
            setMovie(res.data);
               })
            .catch()
    }, [])

    const handleChange = (e) => {
        e.persist()
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 10)

            setMovie({
                ...movie,
                [e.target.name]: value
            });
        }
        const handleSubmit = (e) => {
            e.preventDefault()

           axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then((res) => {
        console.log('update props:', props);
        console.log(res.data);
        props.setMovie(res.data);
        props.history.push(`/movies/${id}`);
      })
      .catch(err => {
        console.log(err);
      })

                //     const movies = [...movieList]
                //     setMovieList(
                //         movies.map((movie) => {
                //             return movie.id !== parseInt(id, 10)
                //                 ? movie
                //                 : res.data
                //         })
                //     )
                //     push(`/`)
                // })
                // .catch((err) => {
                //     console.log(err)
                // })
        }


        return (
            <div>
                <h3>Update Movie</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="title"
                        value={movie.title}
                    />

                    <input
                        type="text"
                        name="director"
                        onChange={handleChange}
                        placeholder="director"
                        value={movie.director}
                    />

                    <input
                        type="number"
                        name="metascore"
                        onChange={handleChange}
                        placeholder="metascore"
                        value={movie.metascore}
                        pattern=" 0+\.[0-9]*[1-9][0-9]*$"
                    />

                    <input
                        type="text"
                        name="stars"
                        onChange={handleChange}
                        placeholder="stars"
                        value={movie.stars}
                    />

                    <button className="md-button form-button">Update</button>
                </form>
            </div>
        )
    }
}
export default MovieUpdateForm