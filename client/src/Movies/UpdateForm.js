import React, { useState, useEffect } from "react";
import axios from "axios";


const initialItem = {
  title: '',
  director: '',
  metascore: '',
  stars: []
};

const UpdateForm = props => {
    console.log(`updateform`, props)
    //useState hook in browser
      const[item, setItem] = useState(initialItem)
      const[loading, setLoad] = useState(false)

    useEffect(() => {
    //1. find id
    const id = props.match.params.id;
    //2. find item
    //`${item.id}`, change to string to match
    // id comes from above.
    const itemToUpdate = props.items.find(item => 
      `${item.id}` === id)
    //3. set item to state, if there are itemToUpdate exsists in state
    if(itemToUpdate){
      setItem(itemToUpdate)
    }
    //4. from 2. if id or item changes, need to update
    }, [])

    //3. set item to state

    //   const handleChanges = e =>{
    //       //name and value from input fields, sets key: value pairs
    //       //track changes in forms and updates
    //     setFriend({...friend, [e.target.name]: e.target.value})
    //   }

    //  const postFriends = () => {
    //     axiosWithAuth()
    //       .post('/friends', friend) //update added friend 
    //        .then(res => console.log(res.data))
    //       .catch(err => console.log(err));
    //   };

      const logValues = event => {
        event.preventDefault();
        setLoad({loading:true})
        axios
          .put("http://localhost:5000/api/movies/${item.id}")
          .then(res => console.log(res))
          .catch(err => console.log(err.response))
      };

     
      

    return (
      // <form onSubmit={logValues}>
      //   <label>Title
      //   <input
      //     maxLength="40"
      //     type="text"
      //     name="title"
      //     id="mtitle"
      //     onChange={handleChanges}
      //     value={Movie.title}
      //     placeholder="Title"
      //   />
      //   </label>
      //   {/* two ways to create labels, first way, wrapped as in above */}
      //   <label forHtml="mdir">Director</label>
      //   <input
      //     type="text"
      //     name="director"
      //     id="mdir"
      //     onChange={handleChanges}
      //     value={Movie.director}
      //     placeholder="director"
      //   />
        
      //   <label>MetaScore
      //   <input
      //     type="number"
      //     name="metascore"
      //     id="mmetascore"
      //     onChange={handleChanges}
      //     value={Movie.metascore}
      //     placeholder=""
      //   />
      //   </label>
      //   <button onClick={logValues}>
      //       { loading && (
      //       <i className="fa fa-refresh fa-spin"
      //         style={{ marginRight: "5px" }}
      //         />
      //       )} 
      //       {loading && <span>Loading Friend to Server</span>}
      //       {!loading && <span>Add New Friend</span>}
      //   </button>
      // </form>
      <>
      </>
    );
  }
export default UpdateForm;