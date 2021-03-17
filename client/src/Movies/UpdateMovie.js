import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useParams, useHistory} from 'react-router-dom';

const initialMovie = {
    id: Date.now(),
    title: '',
    director: '',
    metascore: '',
    stars:[]
}

const UpdateMove = props => {

    const [newMovie, setNewMovie] = useState(initialMovie)

    const { id } = useParams();
    const { push } = useHistory();

    // useEffect (() =>{
    //     axios.get(`http://localhost:5000/api/update-movie/${id}`)
    //         .then(res => console.log(res))
    //         .catch(err => console.log(err))
    // },[id])

    const handleChanges = ev => {
        let value = ev.target.value;


    }

    const handleSubmit = e => {
        e.preventDefault();

    
    }

    return(
        <div>
            <form>
                <input 
                type="text"
                name="title"
                placeholder="Title"
                value={props.newMovie.title}
                onChange={handleChanges}
                />
                <input 
                type="text"
                name="director"
                placeholder="Director"
                value={props.newMovie.director}
                onChange={handleChanges}
                />
                <input 
                type="text"
                name="metascore"
                placeholder="Metascore"
                value={props.newMovie.metascore}
                onChange={handleChanges}
                />
                <input type="text"
                name="Stars"
                placeholder="Stars"
                value={props.newMovie.stars}
                onChange={handleChanges}/>
            </form>
        </div>
    )
}

export default UpdateMove;