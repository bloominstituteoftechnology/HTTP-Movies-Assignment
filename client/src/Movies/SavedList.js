import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { Button } from "react-bulma-components";
import styled from "styled-components";
export default class SavedList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="saved-list">
        <h3>Saved Movies:</h3>
        {this.props.list.map(movie => {
          return (
            <NavLink
              to={`/movies/${movie.id}`}
              key={movie.id}
              activeClassName="saved-active"
            >
              <span className="saved-movie">{movie.title}</span>
            </NavLink>
          );
        })}
        <SpacedDiv>
       <NavLink to='/'>
          <Button color='dark' >Home</Button>
        </NavLink>
        <NavLink to='/new-movie'>
          <Button color='primary' >New Movie</Button>
        </NavLink>
        </SpacedDiv>
      </div>
    );
  }
}

const SpacedDiv = styled.div`
  display: flex;

  button {
    margin: 0 1.5rem;
  }
`
