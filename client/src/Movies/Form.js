import React from "react";

const Form = props => (
  <form className="form" onSubmit={() => {props.addMovie(); props.history.push('/');}}>
    <h3>Add a New Movie!</h3>
    <input type="text" name="title" placeholder="title" onChange={props.handleInputChange} value={props.title}/>
    <input type="text" name="director" placeholder="director" onChange={props.handleInputChange} value={props.director}/>
    <input type="number" name="metascore" placeholder="metascore" onChange={props.handleInputChange} value={props.metascore}/>
    <div>
      <input type="text" name="stars[0]" placeholder="star1" onChange={props.handleInputChange} value={props.star0}/>
      <input type="text" name="stars[1]" placeholder="star2" onChange={props.handleInputChange} value={props.star1}/>
      <input type="text" name="stars[2]" placeholder="star3" onChange={props.handleInputChange} value={props.star2}/>
    </div>
    <input className="home-button" type="submit" />
  </form>
);

export default Form;
