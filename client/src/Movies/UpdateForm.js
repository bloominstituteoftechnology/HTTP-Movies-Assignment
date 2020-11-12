import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';


const UpdateMovieForm = ({ updateMovieList,  }) => {
    const [updateMovie, setUpdateMovie] = useState(null);
    const params = useParams()
    const { push } = useHistory();

    const fetchMovie = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(
                (res) => {
                    const processed = {...res.data}
                    processed.stars = res.data.stars.join(', ')
                    setUpdateMovie(processed)
                })
            .catch((err) => console.log(err.response)); 
    };

    useEffect(() => {
        fetchMovie(params.id);
    }, [params.id]);

  
  
    const changeHandler = ev => {   
        ev.persist();
        let value = ev.target.value;
        // if (ev.target.name === 'price') {
            //   value = parseInt(value, 10);
            // }
          
        setUpdateMovie({
            ...updateMovie,
            [ev.target.name]: value
        });
    };
        
    const handleSubmit = e => {
        e.preventDefault();
        const processed = {...updateMovie,}
        processed.stars = updateMovie.stars.split(', ')
        axios
            .put(`http://localhost:5000/api/movies/${params.id}`, processed)
            .then((res)=>{
                updateMovieList()
                console.log(params)
                push(`/movies/${params.id}`);
            })
            .catch(err=>{
                console.log(err);
        });
    };
        
    if (!updateMovie) {
        return <div>Loading movie information...</div>;
    }

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    onChange={changeHandler}
                    placeholder="Title"
                    value={updateMovie.title}
                />
                <div className="baseline" />

                <input
                    type="text"
                    name="director"
                    onChange={changeHandler}
                    placeholder="Director"
                    value={updateMovie.director}
                />
                <div className="baseline" />

                <input
                    type="number"
                    name="metascore"
                    onChange={changeHandler}
                    placeholder="Metascore"
                    value={updateMovie.metascore}
                />
                <div className="baseline" />

                <input
                    type="string"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={updateMovie.stars}
                />
                <div className="baseline" />

                <button className="save-button">Submit Update</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;