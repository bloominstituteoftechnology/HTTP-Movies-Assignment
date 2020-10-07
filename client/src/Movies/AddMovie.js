import React, {useState} from 'react';
import axios from 'axios';

const initialValues = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
}

const AddMovie = () => {
    const [item, setItem] = useState(initialValues);

    const changeHandler = (evt) => {
        evt.preventDefault();
        const {name, value} = evt.target;
        setItem({
            ...item,
            [name]: value, 
        })
        console.log(item);
    }

    const starsHandler = (evt) => {
        const {name, value} = evt.target;
        setItem({
            ...item,
            [name]: value.split('\n')
        })
        console.log(item)
    }

    const submitHandler = (evt) => {
        evt.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', item)
            .then(res => {
                setItem(initialValues);
                window.location = '/'
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
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
                    <textarea name='stars' value={item.stars.join('\n')} onChange={starsHandler} placeholder='Add Notable Actors Here'/>
                </div>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default AddMovie;