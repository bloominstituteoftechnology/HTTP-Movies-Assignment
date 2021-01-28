import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialItem = {
  title: "",
  director: "",
  metascore: 0,
  description: "",
//   stars: [],
};

const UpdateForm = props => {
  const { push } = useHistory();
  const [item, setItem] = useState(initialItem);
  const id = props.match.params.id;
  // const { id } = useParams(); uses hook --^


  // console.log('item id', id);

  useEffect(()=>{
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res=>{
        setItem(res.data);
      })
      .catch(err=>{
        console.log(err);
      });
  }, []);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "stars") {
        const index = ev.target.index
      setItem({
          ...item.stars,
          [ev.target.name]: value
      })
    }
    else  {

    setItem({
      ...item,
      [ev.target.name]: value
    });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    console.log(item)
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(res => {
        console.log('res', res)
        props.setMovieList(res.data)
        push(`/movies/${id}`)

      })
      .catch(err => {
        console.log(err)
      })
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          onChange={changeHandler}
          placeholder="title"
          value={item.title}
        />
        <div className="baseline" />

        <input
          type="text"
          name="director"
          onChange={changeHandler}
          placeholder="director"
          value={item.director}
        />
        <div className="baseline" />

        <input
          type="number"
          name="metascore"
          onChange={changeHandler}
          placeholder="Metascore"
          value={item.metascore}
        />
        <div className="baseline" />
        {/* {
            item?.stars?.map((star, index) => (
                <input
                    type="text"
                    key={`${star}~${index}`}
                    index={index}
                    name='stars'
                    onChange={changeHandler}
                    value={star}
                />
            ))
        } */}
        {/* <input
                    type="array"
                    name="stars"
                    onChange={changeHandler}
                    placeholder="Stars"
                    value={item.stars}
                /> */}
        <div className="baseline" />

        <button onClick={handleSubmit} className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;