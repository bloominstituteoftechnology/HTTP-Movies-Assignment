import React from "react";
import axios from "axios";

const movieStuff = {
    id: Date.now,
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

const UpdateMovies = props => {
    const [updateMovie, setUpdateMovie] = usestate(movieStuff)

    
  const handleSubmit = e => {
    useEffect(() => {
      const itemToUpdate = props.items.find(thing => `${thing.id}` === id);

      if (itemToUpdate) {
        setItem(itemToUpdate);
      }
    }, [props.items, id]);

    const changeHandler = ev => {
      ev.persist();
      let value = ev.target.value;
      

      setItem({
        ...item,
        [ev.target.name]: value
      });
    };

    e.preventDefault();
    // make a PUT request to edit the item
    axios
      .put(`http://localhost:3333/items/${id}`, item)
      .then(res => {
        // res.data is the FULL array with the updated item
        // That's not always the case. Sometimes you need to build your
        // own updated array
        props.setItems(res.data);
        props.history.push(`/item-list/${id}`);
      })
      .catch(err => console.log(err));
  };


  return(
      <div>


      </div>
  )
};
