import React from 'react';
import {Link} from 'react-router-dom';

let FriendForm = props => {
    return (
        <div className="header">
            <form onSubmit={props.submitHandler} autoComplete="off">
                <p>Enter the movie data below:</p>
                <input name='title' type="text" value={props.value} placeholder="What's the movie's title?" autoComplete="off" onChange={props.changeHandler}/>
                <input name='director' type="text" value={props.value} placeholder="What's the director's full name?" autoComplete="off" onChange={props.changeHandler}/>
                <input name='metascore' type="number" value={props.value} placeholder="What's the movie's metascore?" autoComplete="off" onChange={props.changeHandler}/>
                <input name='stars' type="text" value={props.value} placeholder="Please enter the movie's 3 top-billed stars (comma-separated)." autoComplete="off" onChange={props.changeHandler}/>
                <input type="submit" />
            </form>
            <Link to="/" >Return to Movie List</Link>
        </div>
    )
}

export default FriendForm;