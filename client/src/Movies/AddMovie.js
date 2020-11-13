import {useCompleteInput} from 'utahidaho';
import axios from 'axios'
import React, {useState, useEffect} from 'react';
import {useParams, Link, Redirect} from 'react-router-dom';

const AddMovie = (props) => {
    const title = useCompleteInput('Title');
    const dic = useCompleteInput('Director');
    const score = useCompleteInput('Metascore');
    const act1 = useCompleteInput('Actor');
    const act2 = useCompleteInput('Actor');
    const act3 = useCompleteInput('Actor');
    const [d, setD] = useState(false)

        const deleteMovie = () =>{
            axios.post(`http://localhost:5000/api/movies/`,{id:props.id, title: title.value, director:dic.value, metascore: score.value, stars: [act1.value, act2.value, act3.value]}).then(res =>{
                console.log('post',res.data);
                props.getMovieList();
                setD(true);
            })
    }
    if(d) return <Redirect to={`/`}/>
    return(
        <div className='movie-card update'>
        <hr></hr>
        <h2>Add Movie</h2>
        <div className='c'>
        {title.comp}
        {dic.comp}
        {score.comp}
        {act1.comp}
        {act2.comp}
        {act3.comp}
        </div>
        <button onClick={deleteMovie} className='upButt'>Add Movie</button>
        <hr></hr>
        </div>
    )
}

export default AddMovie;