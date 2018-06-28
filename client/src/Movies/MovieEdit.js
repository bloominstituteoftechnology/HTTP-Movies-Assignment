import React from 'react';
import MovieCreate from './MovieCreate';

const MovieEdit = props => {
    return (
        <div>
            <MovieCreate {...props} movie={props.match.params.id} handleSetData={props.handleSetData} />
        </div>
    );
}

export default MovieEdit;