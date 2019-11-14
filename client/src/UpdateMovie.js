import React,{useState,useEffect} from "react"
import axios from "axios"

const UpdateMovie = props => {
const [edit,setEdit] = useState({
    title:"",
    director:"",
    metascore:"",
})
const id = props.match.params.id
useEffect(()=>{
    axios.get(`http://localhost:5000/api/movies/${id}`)
    .then(res => {setEdit(res.data)})
    .catch(err => console.log(err))
},[id])

const handleChange = e => {
    setEdit({
        ...edit,
    [e.target.name]:e.target.value
    })
    console.log(edit)
}
const handleSubmit = e => {
   
    axios.put(`http://localhost:5000/api/movies/${id}`,edit)
    .then(res => {props.history.push("/")})
    .catch(err => console.log(err))
    e.preventDefault()
}

return (
    <form onSubmit={handleSubmit}>
<h1>{edit.title}</h1>
        <input name="title" value={edit.title} onChange={handleChange} /> 
        <input name="director" value={edit.director} onChange={handleChange} /> 
        <input name="metascore" value={edit.metascore} onChange={handleChange} /> 
    <button>Submit</button>
    </form>
)


}
export default UpdateMovie