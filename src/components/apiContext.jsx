import React, { useContext, useState, useEffect, createContext } from "react";
import axios from "axios";

const APIContext = createContext();

export function APIContextProvider({ children }) {

    const [poems, getPoems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://poetrydb.org/random/20")
            .then(poemResponse => { getPoems(poemResponse.data) })
            .catch(error => { setError(error) })
            .finally(() => { setLoading(false) })
    }, []);
    return (
        <APIContext.Provider value={{ poems, loading, error }}>
            {children}
        </APIContext.Provider>
    );
}

// Create a hook to use the APIContext, this is a Kent C. Dodds pattern
export function useAPI() {
    const context = useContext(APIContext);
    if (context === undefined) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
}