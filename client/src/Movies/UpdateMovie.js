import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    id: '',
    stars: []
}

export default function UpdateMovie(props) {
    const [values, setValues] = useState(initialValues)
    const { id } = useParams()

    const history = useHistory()

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setValues(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [id])

    const handleChanges = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, values)
            .then(res => {
                props.getMovieList()
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                    type='text'
                    name='title'
                    value={values.title}
                    onChange={handleChanges}
                />
                <label>Director</label>
                <input 
                    type='text'
                    name='director'
                    value={values.director}
                    onChange={handleChanges}
                />
                <label>Metascore</label>
                <input 
                    type='text'
                    name='metascore'
                    value={values.metascore}
                    onChange={handleChanges}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}

// const { title, director, metascore, stars } = props.movie;
//   return (
//     <div className="movie-card">
//       <h2>{title}</h2>
//       <div className="movie-director">
//         Director: <em>{director}</em>
//       </div>
//       <div className="movie-metascore">
//         Metascore: <strong>{metascore}</strong>
//       </div>
//       <h3>Actors</h3>

//       {stars.map(star => (
//         <div key={star} className="movie-star">
//           {star}
//         </div>
//       ))}
//     </div>