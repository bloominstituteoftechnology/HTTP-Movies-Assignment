import React, {useState, useEffect } from 'react';
import axios from 'axios';


const initialMovie = {
    title: '',
    director: '',
    metascore: '',
    stars: ''
}


const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie)

    return(
        <div>
            <h2>Update Movie</h2>
            <form>
                <input
                    type='text'
                    name='title'
                    placeholder='title'
                    value=''
                    onChange='' 
                />
                <input
                    type='text'
                    name='director'
                    placeholder='director'
                    value=''
                    onChange=''  
                />
                <input
                    type='text'
                    name='metascore'
                    placeholder='metascore'
                    value=''
                    onChange=''  
                />
                <input
                    type='text'
                    name='stars'
                    placeholder='stars'
                    value=''
                    onChange=''  
                />
                <button>Update</button>
            </form>
        </div>
    )
}


export default UpdateMovie;