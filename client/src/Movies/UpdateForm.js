import React from 'react';

const UpdateForm = (props) => {

    return(
        <div>
            <form>
                <input
                    type='text'
                    name='title'
                    placeholder='Title'
                />
                <input
                    type='text'
                    title='director'
                    placeholder='Director'
                />
                <input 
                    type='number'
                    title="metascore"
                    placeholder='Metascore'
                />
                <input  
                    type='text'
                    title='stars'
                    placeholder='Stars'
                />
            </form>
        </div>
    )
}

export default UpdateForm