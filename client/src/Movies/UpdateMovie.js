import React, {useState, useEffect} from "react"



const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };

const UpdateMovie = (props) => {
 const [movieInfo, setMovieInfo] = useState({initialItem})

 useEffect(() => {
     console.log("props test", props.items)
    const editingItem = props.items.find(thing => {
      return thing.id === Number(props.match.params.id);
    });

    if (editingItem) {
      setMovieInfo(editingItem);
    }
  }, [props.items, props.match.params]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
   console.log(movieInfo)
    setMovieInfo({
      ...movieInfo,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = Number(props.match.params.id);
    props.updateItem(id, movieInfo);

  };

    return (
        <div className="form">
            <h2>Update Item</h2>
            <form onSubmit={handleSubmit}>
            <label>
                Title: <input 
                  type="text"
                  name="title"
                  onChange={changeHandler}
                  value={movieInfo.title}
                />
            </label>
            <label>
                Director: <input 
                  type="text"
                  name="director"
                  onChange={changeHandler}
                  value={movieInfo.director}
                />
            </label>
            <label>
                MetaScore: <input 
                  type="text"
                  name="metascore"
                  onChange={changeHandler}
                  value={movieInfo.metascore}
                />
            </label>
            <label>
                stars: <input 
                  type="text"
                  name="stars"
                  onChange={changeHandler}
                  value={movieInfo.stars}
                />
            </label>
            <button type="submit">Submit Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie;