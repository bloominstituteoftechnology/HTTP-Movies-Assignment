import React, {useState, useEffect} from 'react';
import axios from 'axios';

const initialItem = {
    title: '',
    director: '',
    metascore:'',
    stars: ''
}


const UpdateForm = (props) => {

    const[movie, setMovie] = useState(initialItem)

    useEffect(() => {
        const selectedItem = props.movie.find(item => {
            return `${item.id}` === props.match.params.id;
        })
        console.log(selectedItem)
        if(selectedItem){
            setMovie(selectedItem)
        }
    }, [props.movie, props.match.params.id])

    const handleChanges = e => {
        e.persist();
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => {
                console.log(err)
            });
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                    onChange={handleChanges}
                    value={movie.title}
                />
                <input
                    type='text'
                    name='director'
                    placeholder='Director'
                    onChange={handleChanges}
                    value={movie.director}
                />
                <input 
                    type='number'
                    name="metascore"
                    placeholder='Metascore'
                    onChange={handleChanges}
                    value={movie.metascore}
                />
                <input  
                    type='text'
                    name='stars'
                    placeholder='Stars'
                    onChange={handleChanges}
                    value={movie.stars}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateForm