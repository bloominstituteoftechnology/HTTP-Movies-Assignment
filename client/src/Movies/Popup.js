import React from 'react'

const Popup = props =>{

    const handleYesClick = () => {
        props.onYes()
    }

    const handleNoClick = () => {
        props.onNo()
    }

return (<div>
        <h2>Do you really want to delete this movie?</h2>
        <button onClick={handleYesClick}>Yes</button>
        <button onClick={handleNoClick}>No</button>
        </div>)
}

export default Popup