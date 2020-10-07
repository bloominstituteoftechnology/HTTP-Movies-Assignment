import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovie = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState(initialItems);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const changeHandler = (evt) => {
        evt.persist();
        const {name, value} = evt.target;
        setItem({
            ...item,
            [name]: value,
        })
    }

    const starsHandler = (evt) => {
        evt.persist();
        const { name, value } = evt.target
        console.log(evt.target.value);
        setItem({
            ...item,
            [name]: value.split("\n")
        })
        console.log(item.stars, "STARZZZ")
    }

    const submitHandler = (evt) => {
        evt.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                props.movieList.map((movie) => movie.id === item.id ? item : null);
                history.push(`/`)
            })
            .catch(err => console.log(err))
    }


    return(
        <div>
            <h2> Update Items </h2>
                <form onSubmit={submitHandler}>
                    <input
                    type='text'
                    name='title'
                    value={item.title}
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    > 
                    </input>
                    
                    <input
                    type='text'
                    name='director'
                    value={item.director}
                    onChange={changeHandler}
                    placeholder='Director Name'
                    > 
                    </input>
                    
                    <input
                    type='number'
                    name='metascore'
                    value={item.metascore}
                    onChange={changeHandler}
                    placeholder='Metascore'
                    > 
                    </input>

                    
                    <div className='actors'>
                        <textarea name="stars" value={item.stars.join("\n")} onChange={starsHandler} />                    
                    </div>
                    <button>Update</button>
                </form>
        </div>
)
}

export default UpdateMovie;