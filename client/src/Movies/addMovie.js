import React,{useState,useEffect} from "react"
import axios from "axios"

const AddMovie = props => {
const [add ,setAdd] = useState({
    title:"",
    director:"",
    metascore:"",
    stars: ""
})


const handleChange = e => {
    setAdd({
        ...add,
    [e.target.name]:e.target.value
    })
    console.log(add)
}
const handleSubmit = e => {

    axios.post(`http://localhost:5000/api/movies/`,add)
    .then(res => {props.history.push("/")})
    .catch(err => console.log(err))
    e.preventDefault()
}

return (
    <form onSubmit={handleSubmit}>
    <h1>{add.title}</h1>
    <h3>{add.director}</h3>
    <h3>{add.metascore}</h3>
    <h3>{add.stars}</h3>
        <input name="title" placeholder="Title" value={add.title} onChange={handleChange} /> 
        <input name="director" placeholder="Director" value={add.director} onChange={handleChange} /> 
        <input name="metascore" placeholder="score" value={add.metascore} onChange={handleChange} />
        <input name="stars" placeholder="actors" value={add.stars} onChange={handleChange} /> 
    <button>Submit</button>
    </form>
)


}
export default AddMovie