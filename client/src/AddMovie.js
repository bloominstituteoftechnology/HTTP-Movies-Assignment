import React,{useState,useEffect} from "react"
import axios from "axios"

const AddMovie = props => {
const [add,setAdd] = useState({
    title:"",
    director:"",
    metascore:"",
    stars: []
})
// const id = props.match.params.id

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
        <input name="title" value={add.title} onChange={handleChange} /> 
        <input name="director" value={add.director} onChange={handleChange} /> 
        <input name="metascore" value={add.metascore} onChange={handleChange} /> 
    <button>Submit</button>
    </form>
)


}
export default AddMovie