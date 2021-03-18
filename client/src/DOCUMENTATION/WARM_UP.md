Objective 1 - make a put request to an external API using axios

CRUD - Create, Read, Update, Delete
PUT - is the U in CRUD 
Sending a put request tells the server you want to update some existing data

Put takes a body like post and identifies data that needs to be updated somewhere. 

Axios.put(`http://someone.com/${couldHaveDynamicID`, someUpdate)
.then(res => {res.data})
.catch(err => {{some err}}

)
