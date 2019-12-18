import React, { useState } from 'react'
import Axios from 'axios'

const Form = () => {

const [newMovie, setNewMovie] = useState({})

const handleChange = e => {
    e.preventDefault();
    setNewMovie({...newMovie, [e.target.name]: e.target.value})
}



return(
    <form>
        <input type="text" name="title" placeholder="title" onChange={handleChange}/>
        <input type="text" name="director" placeholder="director" onChange={handleChange}/>
        <input type="text" name="metascore" placeholder="metascore" onChange={handleChange}/>
        <input type="text" name="stars" placeholder="stars" onChange={handleChange}/>
    </form>
)


}
export default Form;