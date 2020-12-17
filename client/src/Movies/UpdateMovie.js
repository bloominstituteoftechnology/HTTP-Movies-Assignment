import React, { useState } from 'react'
import { axiosCall } from '../utils/axiosCall'
import Popup from './Popup'

const UpdateMovie = props => {

const [showPopUp, setShowPopUp] = useState(false)

const { onUpdateClick } = props

const changeHandler = e => {
    e.persist()
    let value = e.target.value
}

const deleteItem = () => {
setShowPopUp(true)
deleteCall()
}

const closePopup = () => {
    setShowPopUp(false)
}

const deleteCall = () => {
    axiosCall()
    .delete('')
    .then(res => {
        //props.setItem()
    })
    .catch(err => console.log(err))
}


    return (

        <div className="movieUpdate">
        <h3>See an error? Fix it!</h3>
        <form className="form" onSubmit={onUpdateClick}>
        
        <label>Title:</label>
        <input
        type='text'
        name='title'
        id='title'
        onChange={changeHandler}
        />
        <br />
        <label>Director:</label>
        <input
        type='text'
        name='director'
        id='director'
        onChange={changeHandler}
        />
        <br />
        <label>Metascore:</label>
        <input
        type='number'
        name='score'
        id='score'
        onChange={changeHandler}
        />
        <br />
        <label>Actor:</label>
        <input
        type='text'
        name='actor'
        id='actor'
        onChange={changeHandler}
        />
        <br/>
        <button className="update-button" type="submit">Save Changes</button>
        <button className="delete-button">Delete</button>

{ showPopUp &&
        <Popup onYes={deleteItem} onNo={closePopup}/>
}
        </form>
        </div>
    )
}

export default UpdateMovie