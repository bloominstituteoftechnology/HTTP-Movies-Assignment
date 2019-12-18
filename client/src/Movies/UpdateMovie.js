import React, { useState, useEffect } from "react";

const initialMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
}

const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    // useEffect(() => {
    //     const movieToEdit = props.movie.find(e => `{e.id}` === props.match.params.id);
    //     console.log(props.movie, movieToEdit);
    //     if (movieToEdit) {
    //         setMovie(movieToEdit);
    //     }
    // }, [props.movie, props.match.params.id])

    // const changeHandler = e => {
    //     e.persist();
    //     let value = e.target.value;
    //     if (e.target.name === )
    // }

    return (
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                type="text"
                name="title"
                placeholder="Title"
                // onChange={}
                value={movie.title}
                />
                 <div className="baseline" />

                 <input
                 type="text"
                 name="director"
                 placeholder="Director"
                //  onChange={}
                 value={movie.director}
                 />
                <div className="baseline" />

                <input
                type="text"
                name="metascore"
                placeholder="Metascore"
                // onChange={}
                value={movie.metascore}
                />
                <div className="baseline" />

                <input
                type="text"
                name="stars"
                placeholder="Stars"
                // onChange={}
                value={movie.stars}
                />
                <div className="baseline" />

                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovie;