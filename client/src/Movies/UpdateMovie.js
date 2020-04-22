import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const someMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateForm = (props) => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(someMovie)
    const { id } = useParams()
    useEffect(() => {
        axios.get(``)
            .then(res => {
                console.log(res -)
            })
            .catch(err =>{console.log(err)})
    }, [id])
};

const handleChanges = event => {
    event.persist()
    let value = event.target.value;
    if (event.target.name === 'title') {
        value = parseInt(value, 10)
    }

    setMovie({
        ...movie,
        [event.target.name]: value
    })
}



const UpdateMovie = () => {
    return (
        <div>
            <h1>Welcome to the Update Movie Form</h1>
        </div>
    );
};

export default UpdateMovie;
