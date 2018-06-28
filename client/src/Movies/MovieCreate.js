import React, { Component }  from 'react';

class MovieCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
         }
    }
    render() { 
        console.log('movie create: ', this.props)
        const { title, director, metascore, stars } = this.props.propsData
        return ( 
            <form onSubmit={this.props.handleSave}>
                <input name='title' type='text' value={title} placeholder='title' onChange={this.props.onChange}   />     
                <input name='director' type='text' value={director} placeholder='director'  onChange={this.props.onChange}   />     
                <input name='metascore' type='number' value={metascore} placeholder='metascore'  onChange={this.props.onChange}   />     
                <input name='stars' type='text' placeholder='stars'  onChange={this.props.onChange} />
                <button>Submit</button>  
            </form>   
           
         )
    }
}
 
export default MovieCreate;