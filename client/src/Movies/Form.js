import React from "react";

const Form = props => (
  <form className="form" onSubmit={() => {props.addMovie(); props.history.push('/');}}>
    <input type="text" name="title" placeholder="title" onChange={props.handleInputChange} value={props.title}/>
    <input type="text" name="director" placeholder="director" onChange={props.handleInputChange} value={props.director}/>
    <input type="number" name="metascore" placeholder="metascore" onChange={props.handleInputChange} value={props.metascore}/>
    <input type="text" name="stars[0]" placeholder="star" onChange={props.handleInputChange} value={props.star0}/>
    <input type="text" name="stars[1]" placeholder="star" onChange={props.handleInputChange} value={props.star1}/>
    <input type="text" name="stars[2]" placeholder="star" onChange={props.handleInputChange} value={props.star2}/>
    <input type="submit" />
  </form>
);

export default Form;
