import axios from "axios";
import React,{useState} from 'react';
import{useHistory} from 'react-router-dom'

const movieData={
  title: '',
  director: '',
  metascore: '',
  stars: []
}
export const AddMovie=(props)=>{
    const [addedMovie,setAddedMovie]=useState(movieData);
    const [star,setStar]=useState('')
    const {push}=useHistory();

    const handleChange=(e)=>{
        setAddedMovie({...addedMovie,[e.target.name]:e.target.value})
    }

    const starChange=(e)=>{
    //     e.preventDefault();
    // const star=e.target.value
        setStar(e.target.value)
// console.log(addedMovie)
console.log(star)    }

    const starSubmit=(e)=>{        
        e.preventDefault();      
    addedMovie.stars.push(star);
    setStar('');
        console.log(addedMovie)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios
            .post(`http://localhost:5000/api/movies`,addedMovie)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            push(`/`);
        setAddedMovie(
            {id: '',
            title: '',
            director: '',
            metascore: '',
            stars: []}
            )
    }
    // console.log(props)
    return(
    <form onSubmit={handleSubmit}>
        <input type='text' name='title' placeholder='title' onChange={handleChange}/>
        <input type='text' name='director' placeholder='director' onChange={handleChange}/>
        <input type='text' name='metascore' placeholder='metascore' onChange={handleChange}/>
        {/* <form onSubmit={starSubmit}>         */}
            <input type='text' name='stars' placeholder='stars' onChange={starChange} />
            <button onClick={starSubmit}>Add Star</button>
        {/* </form> */}
        {/* {addedMovie.stars.map(star=>
        <div id={star}>
            <p>{star}</p>
        </div>
        )} */}
        <button>Add Movie</button>
    </form>
    )

}

