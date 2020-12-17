import axios from "axios"
import React,{ useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export function useDebounce (t = 500) {
    let time = t;
    let timeout = null;
    function debounce (func, ...rest) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {func(...rest)}, time);
    }
    return debounce; 
}

export const MovieUpdateForm = (props) => {
    const debounce = useDebounce();
    const { id } = useParams();
    const initialMovie = {
        id: `${id}`,
        title: '',
        director: '',
        metascore: 0,
        stars: [''],
      }
    const [movie, setMovie] = useState(initialMovie)
    const [ originalStars, setOriginalStars] = useState([])
    const [isRendered, setisRendered] = useState(false)
    
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                setMovie(res.data)
                setOriginalStars(res.data.stars)
            })
            .catch((fuzz) => {
                console.log(fuzz)
            })
    }, [])

    const formatStars = (stars) => {
        let starString = "";
        stars.forEach((item) => {
            starString += `${item}, `
        })
        return starString;
        
    }

    const checkIfArrayEqual = (ar1, arr2) => {
        return (JSON.stringify(ar1) === JSON.stringify(arr2))
    }

    const handleUpdateChange = (ev) => { 
        console.log("i ran")
        if(ev.target.name === "stars"){
            console.log(movie.stars)
            setMovie({
                ...movie,
                stars: ev.target.value.split(", ").map((item) => {
                   if( item !== ""){
                    return item.replace(",", "").replace(/^( *)/ , "").replace(/( *)$/, "")
                   } else { 
                    return
                   }
                })
            })
            debounce(formatStars, movie.stars)
        } else {
            setMovie({
                ...movie,
                [ev.target.name]: ev.target.value
            })
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
            <label htmlFor="title">
                Title:
                <input type="text" name="title" onChange={handleUpdateChange} value={movie.title}></input>
            </label>
            <label htmlFor="director">
                Director:
                <input type="text" name="director" onChange={handleUpdateChange} value={movie.director}></input>
            </label>
            <label htmlFor="metascore">
                Metascore:
                <input type="text" name="metascore" onChange={handleUpdateChange} value={movie.metascore}></input>
            </label>

            <label htmlFor="stars">
                Stars:
                <input type="text" name="stars" onChange={handleUpdateChange} value={checkIfArrayEqual(movie.stars, originalStars) ? formatStars(originalStars) : debounce(formatStars, movie.stars)}></input>
            </label>
            <button>Submit</button>
        </form>
        </>
    )
}

export default MovieUpdateForm;