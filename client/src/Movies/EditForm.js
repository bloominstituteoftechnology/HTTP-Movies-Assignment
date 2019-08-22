import React, {useState, useEffect } from "react";
import axios from "axios";

const EditForm = (props) => {

const paramID = props.match.params.id

const [entry, setEntry] = useState({
    title: "",
    director: "",
    metascore: ""
})

useEffect(() =>  {
    axios
.get(`http://localhost:5000/api/movies/${paramID}`)
.then(res => setEntry(res.data))
.catch(err => console.log(err.response))
}, [paramID])
   

const handleChange = ev => {
    ev.preventDefault();
    setEntry({
      ...entry,
      [ev.target.name]: ev.target.value
    });
  };

const handleSubmit = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${paramID}`, entry)
      .then(res => {
        console.log(res);
        props.history.push('/');
      })
      .catch(err => console.log(err.response));
  };

return (
    <div className="edit-form">
        <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="title"
          value={entry.title}
        />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          placeholder="director"
          value={entry.director}
        />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          placeholder="metascore"
          value={entry.metascore}
        />
        <button>Update</button>
        </form>
    </div>
)

}

export default EditForm;