import React, { useState } from 'react';


export default function UpdateMovie() {
    const [data, setData] = useState({
        id: null,
        title: "",
        director: "",
        metascore: "",
        stars: [],
    }); 

    const handleIdChange = event => {
        setData({ id: event.target.value});
    }

    const handleTitleChange = event => {
        setData({ title: event.target.value });
    }

    const handleDirectorChange = event => {
        setData({ director: event.target.value });
    }

    const handleMetascoreChange = event => {
        setData({ metascore: event.target.value });
    }

    const handleStarsChange = event => {
        setData({ stars: event.target.value });
    }


    // handleSubmit(event) {
    //     event.preventDefault();
    // }

        return (
            <div>
            <h1>Delete Movie</h1>
            <form>
                <label>
                    Id:<br></br>
                    <input
                        type="text"
                        value={this.id}
                        onChange={handleIdChange}
                    />
                </label><br></br>

                <label>
                    Title:<br></br>
                    <input
                        type="text"
                        value={this.title}
                        onChange={handleTitleChange}
                    />
                </label><br></br>

                <label>
                    Director:<br></br>
                    <input
                        type="text"
                        value={this.state.director}
                        onChange={handleDirectorChange}
                    />
                </label><br></br>

                <label>
                    Metascore:<br></br>
                    <input
                        type="text"
                        name="metascore"
                        value={this.state.metascore}
                        onChange={handleMetascoreChange}
                    />
                </label><br></br>

                <label>
                    Stars:<br></br>
                    <input
                        type="text"
                        name="stars"
                        value={this.state.stars}
                        onChange={handleStarsChange}
                    />
                </label><br></br>
                <br></br>
                <input type="submit" value="Update" />
            </form>
            </div>
        );
}