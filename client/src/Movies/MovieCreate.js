import React, { Component }  from 'react';

class MovieCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
         }
    }
    render() { 
        console.log('movie create: ', this.props)
        return ( 
            <form onSubmit={this.props.handleSave} className='inputField'>
                <input name='title' type='text'  placeholder='title' onChange={this.props.onChange}   />     
                <input name='director' type='text'  placeholder='director'  onChange={this.props.onChange}   />     
                <input name='metascore' type='number'  placeholder='metascore'  onChange={this.props.onChange}   />     
                <input name='stars' type='text' placeholder='stars'  onChange={this.props.onChange} />
                <button>Submit</button>  
            </form>   
           
         )
    }
}
 
export default MovieCreate;