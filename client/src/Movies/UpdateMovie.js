import React from 'react';
import axios from 'axios';


const UpdateMovie = (props) => {
    console.log(props);

    const handleInputChange =(e) =>{
    props.setState({[e.target.name]: e.target.value})
        }

    const handleSubmit = (e, id) => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, props.movie)
        .then(response => {
            this.setState({movie: response.data})
        })
        .catch(error => {
            console.log(error)
        })
    }


    return(
        <div className="updateForm">
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" placeholder="Movie Title" value={props.movie.title} onChange={handleInputChange} />
                <input type="text" name="director" placeholder="Director" value={props.movie.director} onChange={handleInputChange}/>
                <input type="number" name="metascore" placeholder="Metascore" value={props.movie.metascore} onChange={handleInputChange} />
                {props.movie.star.map((star)=> {
                    return(
                    <input type="number" name="star" placeholder="Star Name" value={star} onChange={handleInputChange} />
                    )
                })}
                

            </form>
        </div>
    )


}

export default UpdateMovie;