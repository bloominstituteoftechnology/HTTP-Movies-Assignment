import React from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const defaultForm = {
    id: 5,
    title: 'Tombstone',
    director: 'George P. Cosmatos',
    metascore: 89,
    stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot']
}

const MovieForm = ({ movieList, setMovieList }) => {
    const { push } = useHistory();
    const [item, setItem] = useState(defaultForm)
    const { id } = useParams();
    
    return (
        <div className="updateForm">
            <h2>Update Movie</h2>
            <form>
                {/* title */}
                <input 
                type='text'
                name='title'
                onChange={changeHandler}
                placeholder='Movie Title'
                value={item.name}/>
                {/* director */}
                <input />
                {/* metascore */}
                <input />
                {/* stars */}
                <input />
            </form>
        </div>
    )
};

export default MovieForm;