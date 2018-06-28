import React from 'react';

class MovieCreate extends React.Component {
    constructor() {
        super();

        this.state = {
            title: '',
            director: '',
            actor: '',
            metascore: 0,
            stars: [],
        }
    }

    render() {
        return (
            <form>
                <input type='text' placeholder='title'/>
                <input type='text' placeholder='director'/>
                <input type='text' placeholder='metascore'/>
                <input type='text' placeholder='actor'/>
            </form>
        );
    }
}

export default MovieCreate;