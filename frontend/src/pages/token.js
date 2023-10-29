import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Token= ({code}) => {
    const [token,setToken] = useState("");
    //const url = `http://localhost:9000/token?code=${code}`
    
    useEffect(()=> {
        fetch(`http://localhost:9000/token?code=${code}`)
        .then(response => response.json())
        .then(json => {setToken(json)}) 
        .catch((error) => {
        })
    } , [code]);

    return(
        <div>
            <p>Token: {token ? JSON.stringify(token) : "...loading"}</p>
        </div>
    );


};

export default Token;