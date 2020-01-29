import React, { useState, useEffect } from "react";
import { Route, withRouter} from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovie from "./Movies/UpdateMovie"
import axios from "axios"
import AddMovie from './Movies/AddMovie'


const App = (props) => {
  const [savedList, setSavedList] = useState([]);

  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        console.log("res.data", res.data)
        setItems(res.data)
      })
      .catch(error => console.log(error));
  }, []);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateItem = (id, item) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, item)
      .then(response => {
        const updatedItem = response.data;
        const newItems = items.map(item => {
          if(item.id !== updatedItem.id){
            return item
          }
          return updatedItem;
        })  
        setItems(newItems);
        props.history.push(`/`);
      })
      .catch(err => console.log(err));
  };

  const deleteItem = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        console.log("delete", response.data)
        setItems(response.data);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route exact path="/add-movie" render={props => (
         <AddMovie {...props} items={items} />
      )} />
      <Route path="/update-movie/:id" render={props => (
          <UpdateMovie {...props} items={items} updateItem={updateItem} />
        )}  />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} items={items} deleteItem={deleteItem} />;
        }}
      />
    </>
  );
};

export default withRouter(App);