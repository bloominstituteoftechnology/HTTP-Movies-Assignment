import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

const UpdateForm = ({ movieList, setMovieList }) => {
    const history = useHistory();
    const { id } = useParams();
    const [formValues, setFormValues] = useState();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(response => {
                setFormValues(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleChange = event => {
        setFormValues({ ...formValues, [event.target.name]: event.target.value });
    };

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(response => {
                setMovieList([...movieList, response.data]);
                history.push('/');
            })
            .catch(error => console.error(error));
    };

    return (
        <div>
            {!formValues ? (
                'Loading...'
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        value={formValues.title}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='director'
                        value={formValues.director}
                        onChange={handleChange}
                    />
                    <input
                        type='text'
                        name='metascore'
                        value={formValues.metascore}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
            )}
        </div>
    );
};

export default UpdateForm;