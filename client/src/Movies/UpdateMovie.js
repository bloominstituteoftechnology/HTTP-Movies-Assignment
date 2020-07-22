import React, { useState } from 'react'
import { Button, TextField, Paper } from '@material-ui/core'

const initialMovieData = {
  title: "",
  director: "",
  metascore: "",
  stars: ""
}

const UpdateMovie = () => {
  const [movieInfo, setMovieInfo] = useState(initialMovieData)

  const handleChanges = e => {
    setMovieInfo({
      ...movieInfo,
      [e.target.name]: [e.target.value]
    })
  }

  return (
    <Paper>
      <form>
        <TextField name="title" label="Title" value={movieInfo.title} onChange={handleChanges} />
        <TextField name="director" label="Director" value={movieInfo.director} onChange={handleChanges} />
        <TextField name="metascore" label="Metascore" value={movieInfo.metascore} onChange={handleChanges} />
        <TextField name="stars" label="Stars" value={movieInfo.stars} onChange={handleChanges} />
        <Button variant="contained" color="primary">Save changes</Button>
      </form>
    </Paper>
  )
}

export default UpdateMovie