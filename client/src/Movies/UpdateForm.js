import React, { useState, useEffect } from "react";
import axios from "axios";


const initialmovie = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
    console.log(`updateform`, props)
    //useState hook in browser
      const[movie, setMovie] = useState(initialmovie)


    const { match, items } = props
    console.log(items)
    useEffect(() => {
    //1. find id
    const id = props.match.params.id;
    console.log(props.match.params.id)
    //2. find movie
    //`${movie.id}`, change to string to match, browser always string
    // // id comes from above.
    // savedList comes from App.js
    // will loop through items to find item, based upon movie id that 
    // was sent after clicking edit on Movie.js
    const movieToUpdate = props.savedList.find(movie => 
    `${movie.id}` === id)
    //3. set movie to state, if there are movieToUpdate exsists in state
    if(movieToUpdate){
    setMovie(movieToUpdate)}
    //4. from 2. if id or movie changes, need to update
    }, [props.savedList, props.match.params.id])

    

      const handleChanges = e =>{
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore'){
          value = parseInt(value, 10)
        }
          //name and value from input fields, sets key: value pairs
          //track changes in forms and updates
        setMovie({...movie, [e.target.name]: e.target.value})
      }

    //  const postFriends = () => {
    //     axiosWithAuth()
    //       .post('/friends', friend) //update added friend 
    //        .then(res => console.log(res.data))
    //       .catch(err => console.log(err));
    //   };

      const logValues = event => {
        console.log(movie)
        event.preventDefault();
        axios
          //need to use backticks because of ${}
          .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
          .then(res => {
            console.log(`update res.data`,res.data)
            //need to update setSavedList from App.js, updateSavedList was passed as props
            //need to spread in, cant just send res.data
          props.updateSavedList([...setMovie, res.data])
          props.history.push('/')})
          
          .catch(err => console.log(err.response))
      };

     
      

    return (
      <form onSubmit={logValues}>
        <label>Title
        <input
          maxLength="40"
          type="text"
          name="title"
          id="mtitle"
          onChange={handleChanges}
          value={movie.title}
          placeholder="Title"
        />
        </label>
        {/* two ways to create labels, first way, wrapped as in above */}
        <label forHtml="mdir">Director</label>
        <input
          type="text"
          name="director"
          id="mdir"
          onChange={handleChanges}
          value={movie.director}
          placeholder="director"
        />
        
        <label>MetaScore
        <input
          type="number"
          name="metascore"
          id="mmetascore"
          onChange={handleChanges}
          value={movie.metascore}
          placeholder=""
        />
        </label>
        <label>Stars
        <input
          type="text"
          name="stars"
          id="mstars"
          onChange={handleChanges}
          value={movie.stars}
          placeholder="stars"
        />
        </label>
        <button onClick={logValues}>
            Submit to Edit
        </button>
      </form>
    );
  }
export default UpdateForm;