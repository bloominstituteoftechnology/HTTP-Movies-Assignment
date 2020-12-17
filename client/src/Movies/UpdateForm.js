import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function UpdateForm(props) {
    const [addMovie, setAddMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: [],
    });
    const params = useParams();
    const { push } = useHistory();

    useEffect(() => {
        if (props && props.movieList) {
            const movie = props.movieList.filter(
                (movie) => parseInt(movie.id) === parseInt(params.id)
            );

            if (movie.length) {
                setAddMovie({
                    ...addMovie,
                    title: movie[0].title,
                    director: movie[0].director,
                    metascore: parseInt(movie[0].metascore),
                    stars: movie[0].stars,
                });
            }
        }
    }, [props]);

    const onInputChange = (e) => {
        if (e.target.name === 'stars') {
            const starsList = e.target.value.split(',');
            setAddMovie({
                ...addMovie,
                stars: starsList,
            });
        } else if (e.target.name === 'metascore') {
            setAddMovie({
                ...addMovie,
                metascore: parseInt(e.target.value),
            });
        } else {
            setAddMovie({
                ...addMovie,
                [e.target.name]: e.target.value,
            });
        }
    };

    const submitAddedMovie = (e) => {
        e.preventDefault();
        const data = addMovie;
        if(props && props.updateMovie && params.id) {
            const id = parseInt(params.id);
            data.id= id;
            props.updateMovie(data, id);
            push('/');
        } else{
            props.addNewMovie(data);
            push('/')
        }
    };


    return(
        <div>
            <form onSubmit={submitAddedMovie}>
                <label>
                    Title:
                    <input 
                        name='title'
                        type='string'
                        value ={addMovie.title}
                        onChange={onInputChange}
                        />
                </label>
                <label>
                    Director:
                    <input 
                        name='director'
                        type='string'
                        value ={addMovie.director}
                        onChange={onInputChange}
                        />
                </label>
                 <label>
                     Metascore:
                    <input 
                        name='metascore'
                        type='string'
                        value ={addMovie.metascore}
                        onChange={onInputChange}
                        />
                </label>
                 <label>
                     Stars:
                    <input 
                        name='stars'
                        type='string'
                        value ={addMovie.stars}
                        onChange={onInputChange}
                        />
                </label>
                <button>Add</button>
            </form>
        </div>
    )
}

export default UpdateForm;