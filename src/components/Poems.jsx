import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "./apiContext";
import "./Poems.css";

function Poems() {

    const { poems, loading, error } = useAPI();
    const [setPoem, getSetPoem] = useState("");
    const [favouritePoem, setfavouritePoem] = useState([]);
    function fetchPoems() {
        displayResolver(poems, "");
    }

    function handleAdd(title) {
        console.log(title);
        let stack = [...favouritePoem, title];
        setfavouritePoem([...new Set(stack)]);
    }


    function displayResolver(poems, selectedItem) {
        let allPoems = [];

        if (selectedItem === "") {
            poems.forEach((poem) => {
                allPoems.push((<div key={poem.title}>
                    <Link to={`/poem/${poem.title}`}>
                        <article>
                            <h3>Title: {poem.title}</h3>
                            <h6>Author: {poem.author}</h6>
                        </article>
                    </Link>
                    <button type="button" className="btn btn-dark" onClick={() => handleAdd(poem.title)}>Add Poem</button>

                </div>));
            });
        }

        if (selectedItem === "title") {
            poems.forEach((poem) => {
                allPoems.push((<div key={poem.title}>
                    <Link to={`/poem/${poem.title}`}>
                        <article>
                            <h3>Title: {poem.title}</h3>
                        </article>
                    </Link>
                </div>));
            });
        }

        if (selectedItem === "author") {
            poems.forEach((poem) => {
                allPoems.push((<div key={poem.title}>
                    <Link to={`/poem/${poem.title}`}>
                        <article>
                            <h6>Author: {poem.author}</h6>
                        </article>
                    </Link>
                </div>));
            });
        }

        getSetPoem(allPoems);
    }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>Error!</h1>;

    return (
        <div className="container-fluid pt-5 pb-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <h1>POEMS</h1>
                        <p>Click each Poem to view the poem</p>

                        <button className="btn btn-primary btn-lg" onClick={fetchPoems}>Fetch poems</button>
                        <br />
                        <select className="mt-2 mb-4" onChange={(e) => displayResolver(poems, e.target.value)}>
                            <option value="">All poems</option>
                            <option value="title">Title</option>
                            <option value="author">Author</option>
                        </select>
                        {setPoem ? setPoem : null}

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 pt-5">
                        <h1>favorite poems</h1>

                        <ul type="square">
                            {favouritePoem ? favouritePoem.map((item, index) => (
                                <div key={index}><li>{item}</li></div>
                            )) : null}
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default Poems;