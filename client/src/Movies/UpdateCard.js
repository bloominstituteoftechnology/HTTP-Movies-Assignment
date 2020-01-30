import React, { useEffect, useState } from 'react';
import Axios from 'axios';

function UpdateCard(props) {

    const [status, setStatus] = useState();
    const [update, setUpdate] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(() => {
        Axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
            .then(res => {
                setUpdate(res.data);
            })
    },[])

    const handleChange = event => {
        setUpdate({
            ...update,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();
        Axios.put(`http://localhost:5000/api/movies/${props.match.params.id}`, update)
            .then(res => {
                setStatus(res.statusText);
                console.log(props);
                props.history.push('/');
            })
    }

    return(
        <div>
            <h1>Update Movie</h1>
            <form onSubmit={handleSubmit}>
                <label>Title: <input type='text' placeholder='title' name='title' value={update.title} onChange={handleChange}/></label>
                <label>Director: <input type='text' placeholder='director' name='director' value={update.director} onChange={handleChange}/></label>
                <label>Metascore: <input type='number' placeholder='metascore' name='metascore' value={update.metascore} onChange={handleChange}/></label>
                <button>Submit</button>
            </form>
            {status ? <p>{status}</p> : null}
        </div>
    )
}

export default UpdateCard;