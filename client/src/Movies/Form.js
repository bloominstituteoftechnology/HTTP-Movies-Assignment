import React, {useState, useEffect} from 'react';
import { useParams , withRouter, useHistory} from "react-router-dom";

import axios from 'axios'
// make inputs for stars/actors

const Form = (props) => {


     const [movie, setMovie] = useState('');


   	 const { title, director, metascore, stars} = movie;
       const params = useParams();



      const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };


const history=useHistory()

  const updateMovie = (id, movie) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`,movie )
      .then((res) => setMovie(res.data), history.push("/"))
      .catch((err) => console.log(err.response));
  };


  useEffect(() => {
    fetchMovie(params.id);
  }, []);




    const  changeHandler = ev => {
      
        setMovie({ ...movie, [ev.target.name]: ev.target.value });
    }; 

    const handleSubmit = e => {
        e.preventDefault();
        updateMovie(params.id, movie )
    }
    

return (
           <div>
                <form onSubmit={handleSubmit}>

                <label>
                Title
                 </label><br/>
                    <input
                        name="title"
                        onChange={changeHandler}
                        placeholder= {title}
                        value={title}
                    /><br/>
                <label>
                Director 
                </label><br/>
                    <input
                        name="director"
                        onChange={changeHandler}
                        placeholder= {director}
                        value={director}
                    /><br/>

 				<label>
                metascore
                </label><br/>

                    <input
                        name="metascore"
                        onChange={changeHandler}
                        placeholder= {metascore}
                        value={metascore}
                        /><br/>
		<label>
Stars
                </label><br/>

                    <input
                        name="stars"
                        onChange={changeHandler}
                        placeholder= {stars}
                        value={stars}
                        />




                  

                    <br/><button> Update Movie  </button>
                </form>
            </div>
    )
}





export default Form;

