import axios from "axios"
import React,{ useState } from "react"


export const MovieUpdateForm = (props) => {
    const { id } = props
    const [movie, setMovie] = useState(initialMovie)
    const initialMovie = {
        id: `${id}`,
        title: '',
        director: '',
        metascore: 0,
        stars: [''],
      }

    const handleUpdateChange = (ev) => {
        // ev.persist();
        const value = ev.target.value
        setMovie(value);

        if(ev.target.name === "stars"){
            let stars = movie.stars
            stars.push(value)
        }
    }

    const handleUpdateSubmit = (ev) => {
        axios
            .put(`http://localhost:5000/movies/${id}`, movie)
            .then((res) => {
                console.log(res)
                props.setMovie(res.data)
            })
            .catch((err) => {
                console.log("Error!: ", err)
            })
    }
    return(
        <>
        <form onSubmit={handleUpdateSubmit}>
            <label for="title">
                Title:
                <input type="text" name="title" onChange={handleUpdateChange} value={movie.title}></input>
            </label>
            <label for="director">
                Director:
                <input type="text" name="director" onChange={handleUpdateChange} value={movie.director}></input>
            </label>
            <label for="metascore">
                Metascore:
                <input type="text" name="metascore" onChange={handleUpdateChange} value={movie.metascore}></input>
            </label>

            <label for="stars">
                Stars:
                <input type="text" name="stars" onChange={handleUpdateChange} value={movie.stars}></input>
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}

export default MovieUpdateForm;