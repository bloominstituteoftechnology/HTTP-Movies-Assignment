import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateForm = props => {
  console.log(props);
  const [item, setItem] = useState({
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
  });

  useEffect(() => {
    console.log(props.match.params.id)
    axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
    .then(res => {
      setItem(res.data)
    })
  }, [props.match.params.id])
  const changeHandler = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
      value = [value]
    }

    setItem({
      ...item,
      [e.target.name]: value,
      id: props.match.params.id
    });
  };

  const handleSubmit =  e => {
    e.preventDefault();
    // make a PUT request to edit the item
    console.log(item)
    axios
      .put(`http://localhost:5000/api/movies/${item.id}`, item)
      .then(res => {
        // res.data ==> full array with updated item
        // usually APIs return just the updated item, or just the id of the update item - you need to make a new array with all the old items, and replace the updated item with the updated item
        // const newItemsArr = props.items.map
        console.log(props)
        // setItem(res.data);
        props.history.push(`/movies/${item.id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
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
          type="string"
          name="metascore"
          onChange={changeHandler}
          placeholder="metascore"
          value={item.metascore}
        />
        <div className="baseline" />

        <input
          type="string"
          name="stars"
          onChange={changeHandler}
          placeholder="stars"
          value={item.stars}
        />
        
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;