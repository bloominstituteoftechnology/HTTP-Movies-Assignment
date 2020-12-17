import React, {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import axios from 'axios';

const initialState = {
    id: '',
    title: '',
    director: '',
    metascore: '',
};

const UpdateForm = ({movieList, setMovieList}) => {
    const [formData, setFormData] = useState(initialState);
    const {push} = useHistory();
    const {id} = useParams();

    useEffect(() => {
        axios   
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setFormData(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, formData)
            .then(res => {
                setMovieList([...movieList, res.data]);
                push('/');
            })
            .catch(err => console.log(err))
    }

    return (
        <div style={{textAlign:'center'}}>
            <form onSubmit={handleSubmit}>
                <input value={formData.title} onChange={handleChange} name='title' type='text'/><br/>
                <br/>
                <input value={formData.director} onChange={handleChange} name='director' type='text'/><br/>
                <br/>
                <input value={formData.metascore} onChange={handleChange} name='metascore' type='text' /><br/>
                <br/>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateForm;