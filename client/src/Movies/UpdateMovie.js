import React, { useState, useEffect } from 'react'
import { useLocation, useParams, useHistory } from 'react-router-dom'
import { Button, TextField, Paper } from '@material-ui/core'
import axios from 'axios'

const initialMovieData = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
}

const UpdateMovie = props => {
  const [movieInfo, setMovieInfo] = useState(initialMovieData)
  const history = useHistory()
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    if (location.state) {
      setMovieInfo(location.state)
    } else {
      axios.get(`http://localhost:5000/api/movies/${params.id}`)
        .then(res => setMovieInfo(res.data))
        .catch(err => console.error(err))
    }
  }, [])

  const handleChanges = e => {
    setMovieInfo({
      ...movieInfo,
      [e.target.name]: e.target.value
    })
  }

  const saveChanges = () => {
    // send state to server
    axios.put(`http://localhost:5000/api/movies/${params.id}`, movieInfo)
      .then(res => {
        let newMovieList = props.movieList.map(movie => {
          if(movie.id === res.data.id)  return res.data
          else return movie
        })
        console.log(props.movieList)
        console.log("new list: ", newMovieList)

        props.setMovieList(newMovieList)
        history.push(`/movies/${params.id}`)
      })
      .catch(err => console.error(err))
    // set app state to response data
    // re-direct to movie page
  }

  return (
    <Paper>
      <form>
        <TextField name="title" label="Title" value={movieInfo.title} onChange={handleChanges} />
        <TextField name="director" label="Director" value={movieInfo.director} onChange={handleChanges} />
        <TextField name="metascore" label="Metascore" value={movieInfo.metascore} onChange={handleChanges} />
        <TextField name="stars" label="Stars" value={movieInfo.stars} onChange={handleChanges} />
        <Button variant="contained" color="primary" onClick={saveChanges}>Save changes</Button>
      </form>
    </Paper>
  )
}

export default UpdateMovie