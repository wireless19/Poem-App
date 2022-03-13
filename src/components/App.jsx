import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Poems from "./Poems";
import Poem from "./Poem";
import { APIContextProvider } from "./apiContext";


function App() {

    return (
        <APIContextProvider>
            <Router>

                <Switch>

                    <Route exact path="/" component={Poems} />
                    <Route path="/poem/:title" component={Poem} />

                </Switch>
            </Router>
        </APIContextProvider>
    )

}

export default App;