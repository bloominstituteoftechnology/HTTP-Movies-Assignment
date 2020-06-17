// Create a component with a form to update the chosen movie
// The form should make a PUT request to the server when submitted
// When the call comes back successfully, reset your form state and route the user to /movies where they will see the updated movie in the list

import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import axios from "axios";

const initialMovie = {
  //set object format
  //   id: 5,
  //   title: 'Tombstone',
  //   director: 'George P. Cosmatos',
  //   metascore: 89,
  //   stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
};

/*


const UpdateForm = props => {
  const { push } = useHistory();
  const { id } = useParams();
  const [item, setItem] = useState(initialItem);

  useEffect(() => {
    axios
      .get(`http://localhost:3333/itemById/${id}`)
      .then(res => {
        // res.data
        setItem(res.data);
      })
      .catch(err => console.log(err));
  }, [id]);

  const changeHandler = ev => {
    ev.persist();
    let value = ev.target.value;
    if (ev.target.name === "price") {
      value = parseInt(value, 10);
    }

    setItem({
      ...item,
      [ev.target.name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:3333/items/${id}`, item)
      .then(res => {
        // res.data
        props.setItems(res.data);
        // props.setRefresh(true);
        push(`/item-list/${id}`);
      })
      .catch(err => console.log(err));
  };

  return (
    <div>
      <h2>Update Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={item.name}
        />
        <div className="baseline" />

        <input
          type="number"
          name="price"
          onChange={changeHandler}
          placeholder="Price"
          value={item.price}
        />
        <div className="baseline" />

        <input
          type="string"
          name="imageUrl"
          onChange={changeHandler}
          placeholder="Image"
          value={item.imageUrl}
        />
        <div className="baseline" />

        <input
          type="string"
          name="description"
          onChange={changeHandler}
          placeholder="Description"
          value={item.description}
        />
        <div className="baseline" />

        <input
          type="string"
          name="shipping"
          onChange={changeHandler}
          placeholder="Shipping"
          value={item.shipping}
        />
        <div className="baseline" />

        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateForm;



*/
