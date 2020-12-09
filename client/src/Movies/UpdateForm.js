import React, {useState, useEffect} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import axios from 'axios'

const defaultForm = 
{
  id: 5,
  title: 'Tombstone',
  director: 'George P. Cosmatos',
  metascore: 89,
  stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
}

const UpdateForm = ({ movieList, setMovieList}) => {
 const {push} = useHistory()
 const [item, setItem] = useState(defaultForm)
 const {id} = useParams()


 useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem(res.data)
            })
            .catch(err => {
                console.log(err);
            })
    }, [id]);


 const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "metascore") {
      value = parseInt(value);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
   e.preventDefault();
        axios  
            .post(`http://localhost:5000/api/movies`, item)
            .then(res => {
                setMovieList([...movieList, res.data]);
                setItem({
                    title: '',
                    director: '',
                    stars: '',
                    metascore: ''
                })
                push(`/movies/${res.data.id}`)
            })
            .catch(err => {
                console.log(err);
            })
    }

 return (
  <div>
   <h2>Update Movie</h2>
   <form onSubmit={handleSubmit}>
    <input 
    type='text'
    title='title'
    onChange={changeHandler}
    placeholder='Movie Title'
    value ={item.name}
    />

    <input 
    type='text'
    name='director'
    onChange={changeHandler}
    placeholder='Director'
    value ={item.director}
    />

    <input 
    type='number'
    name='metascore'
    onChange={changeHandler}
    placeholder='Metascore'
    value ={item.metascore}
    />

    <input 
    type='text'
    title='stars'
    onChange={changeHandler}
    placeholder='Stars'
    value ={item.stars}
    />
 <button>Update Movie</button>
   </form>

  </div>
 )
}

export default UpdateForm
