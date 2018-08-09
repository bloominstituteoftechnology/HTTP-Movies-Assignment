import React from 'react'; 

class MovieCreate extends React.Component {
    constructor(){
        super()
        this.state = {}
    }

    render() {

        return (
            <div className="movie-card formCard">
              <form>
                <h1>Title</h1>
                <input type="text"/>
                <h1>Director</h1>
                <input type="text"/>
                <h1>MetaScore</h1>
                <input type="text"/>
                <h1>Stars</h1>
                {/* show starts  */}
                <h1>Add Star</h1>
                <input type="text"/>
                <button>Add star to stars</button>
                <h1>Submit</h1>
                <button>Submit Movie</button>
              </form>
            </div>
            
        )
    }
}

export default MovieCreate; 