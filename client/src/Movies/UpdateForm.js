import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useCompleteInput} from 'utahidaho';
import {useParams, Link, Redirect} from 'react-router-dom';


const UpdateForm = (props) =>{
    const {id} = useParams()
    const [data, setData] = useState({});
    const title = useCompleteInput('Title');
    const dic = useCompleteInput('Director');
    const score = useCompleteInput('Metascore');
    const act1 = useCompleteInput('Actor');
    const act2 = useCompleteInput('Actor');
    const act3 = useCompleteInput('Actor');
    const [save, setSave] = useState(false)
    const [d, setD] = useState(false)
    const getData = () =>{
        axios.get(`http://localhost:5000/api/movies/${id}`).then(res =>{
            setData(res.data);
            console.log(res.data);
            title.update(res.data.title);
            dic.update(res.data.director);
            score.update(res.data.metascore);
            act1.update(res.data.stars[0])
            act2.update(res.data.stars[1])
            act3.update(res.data.stars[2])
        })
    }
    const updateMovie = () =>{
        axios.put(`http://localhost:5000/api/movies/${id}`, {id:id, title: title.value, director:dic.value, metascore: score.value, stars: [act1.value, act2.value, act3.value]}).then(res =>{
            console.log('update',res);
            props.getMovieList();
            setSave(true);
        })

    }
    const deleteMovie = () =>{
        axios.delete(`http://localhost:5000/api/movies/${id}`).then(res =>{
            console.log('delete',res.data);
            props.getMovieList();
            setD(true);
        })

    }
    useEffect(getData, []);

    if(d) return <Redirect to={`/`}/>

    if(save) return <Redirect to={`/movies/${id}`}/>
    
    return(
        <div className='movie-card update'>
        <h2>Edit {title.value}</h2>
        <div className='c'>
        {title.comp}
        {dic.comp}
        {score.comp}
        {act1.comp}
        {act2.comp}
        {act3.comp}
        </div>
        <div>
            <button onClick={updateMovie}className='upButt'>Save Changes</button>
            <Link key={id} to={`/movies/${id}`}>
                <button className='upButt'>Cancel</button>
            </Link>
            <button onClick={deleteMovie}className='upButt'>Delete Movie</button>
        </div>
    </div>
    )
}

export default UpdateForm;