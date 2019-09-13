import React from 'react';

const UpdateMovie = (props) => {
    return ( 
        <form>
            <input placeholder="Title" />
            <input placeholder="Director" />
            <input placeholder="Metascore" />
            <input placeholder="Stars" /> 
            {/* Separate movies with comma */}
        </form>
     );
}
 
export default UpdateMovie;