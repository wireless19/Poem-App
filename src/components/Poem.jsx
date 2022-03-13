import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useAPI } from "./apiContext";


function Poem() {
    const { poems } = useAPI();
    const { title } = useParams();
    let poemTitle = decodeURI(title);
    const poem = poems.find(eachPoem => eachPoem.title === poemTitle);
    const { push } = useHistory();


    return (
        <div className="container pt-5">
            <h1 className="pb-3">Each Poem Page</h1>

            <h3>{poem.title}</h3>
            <h6>{poem.author}</h6>
            <p>{poem.lines}</p>

            <br />
            <button className="btn btn-small btn-primary" onClick={() => push("/")}>Go back</button>

        </div>
    );

}

export default Poem;