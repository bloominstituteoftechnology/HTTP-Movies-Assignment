import Axios from 'axios'
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const initialValues = {
    title: '',
    director: '',
    metascore: '',
    id: '',
    stars: ''
}

export default function AddMovie(props) {
    const [values, setValues] = useState(initialValues)

    const history = useHistory()

    const handleChanges = (e) => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formattedMovie = {...values, id: Date.now(), stars: values.stars.split(',')}
        Axios.post('http://localhost:5000/api/movies', formattedMovie)
            .then(res => {
                props.getMovieList()
                history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    return(
        <div>
            <h2>Add Movie</h2>
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
                <label>Stars</label>
                <input 
                    type='text'
                    name='stars'
                    value={values.stars}
                    onChange={handleChanges}
                />
                <button>Submit</button>
            </form>
        </div>
    )
}