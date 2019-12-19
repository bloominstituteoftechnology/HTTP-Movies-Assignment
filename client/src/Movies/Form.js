import React, { useState } from 'react'
import axios from 'axios'

const Form = (props) => {
    console.log("form props",props)

const [newMovie, setNewMovie] = useState({
    title: '',
    id: props.match.params.id,
    director: '',
    metascore: '',
    stars: ['Aasa'] 

})

const handleChange = e => {
    e.preventDefault();
    setNewMovie({...newMovie, [e.target.name]: e.target.value})
}

const updateMovie = e => {
    e.preventDefault();
    axios
    .put(`http://localhost:5000/api/movies/${props.match.params.id}`, newMovie)
    .then(res => {
        console.log(res)
        console.log(newMovie)
        props.history.push(`/movies/${props.match.params.id}`)
    })
}

return(
    <form onSubmit={updateMovie}>
        <input type="text" name="title" placeholder="title" onChange={handleChange}/>
        <input type="text" name="director" placeholder="director" onChange={handleChange}/>
        <input type="text" name="metascore" placeholder="metascore" onChange={handleChange}/>
        {/* <input type="text" name="stars" placeholder="stars" onChange={handleChange}/> */}
        <button type="submit">submit</button>
    </form>
)


}
export default Form;