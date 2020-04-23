import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const initialItem = {
    title: '',
    director: '',
    metascore: 0,
    stars: []
}

const UpdateForm = () => {
    const { push } = useHistory()
    const [item, setItem] = useState(initialItem)
    const { id } = useParams()
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            setItem(res.data)
        })
        .catch(err => console.log(err))
    }, [])

    const changeHandler = e => {
        e.persist()
        let value = e.target.name ===  'stars'? e.target.value.split(',') : e.target.value
        setItem({
            ...item,
            [e.target.name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.put(`http://localhost:5000/api/movies/${id}`, item)
        .then(res => {
            push(`/movies/${id}`)
        })
    }
    console.log(item)
    return(
        <div className="edit-card edit-form">
            <form onSubmit={handleSubmit}>
                <h2>Editing {item.title}:</h2>
                <input 
                type="text"
                name="title" 
                value={item.title}
                onChange={changeHandler} 
                placeholder="Title"/><br/>
                <input 
                type="text"
                name="director" 
                value={item.director}
                onChange={changeHandler} 
                placeholder="Director"/><br/>
                <input 
                type="number"
                name="metascore" 
                value={item.metascore}
                onChange={changeHandler} 
                placeholder="Metascore"/><br/>
                <input 
                type="text"
                name="stars" 
                value={item.stars.join(',')}
                onChange={changeHandler} 
                placeholder="Stars"/><br/>
                <button className="update-btn">Update</button>
            </form>
        </div>
    )
}

export default UpdateForm