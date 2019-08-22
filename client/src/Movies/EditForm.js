import React, {useState} from "react";

export default MovieForm = () => {

const { title, director, metascore, stars } = props.movie

const [entry, setEntry] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: ""
})

const handleChange = ev => {
    ev.preventDefault();
    setEntry({
      ...entry,
      [ev.target.name]: ev.target.value
    });
  };

return (
    <div className="edit-form">
        <form onSubmit={props.handleSubmit}>
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

<input
          type="text"
          name="stars"
          onChange={handleChange}
          placeholder="stars"
          value={entry.stars}
        />
        <button>Update</button>
        </form>
    </div>
)

}