import React, {useState, useEffect } from 'react';
import Axios from 'axios';

const UpdateMovie = (props) => {
    const [newInfo, setInfo] = useState({})

    const { title, director, metascore, stars, id } = props

    useEffect((id)=> {
        Axios.put(`http://localhost:5000/ap/movies/${id}`)
        .then(res => {
            console.log(res)
        })
    }, [])

console.log(props)
    return (
        <form>
            <input
            type='text'
            value={title}
            name='title'
            placeholder='edit title'
            />
            <input
            type='text'
            value=''
            name='director'
            placeholder='edit director'
            />
            <input
            type='text'
            value=''
            name='metascore'
            placeholder='edit metascore'
            />
            <input
            type='text'
            value=''
            name='stars'
            placeholder='edit actors'
            />
        </form>
    )
}

export default UpdateMovie;