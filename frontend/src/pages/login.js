import React from "react";

var client_id = "c71d9d2d1035480aa83549558035aa59";
var redirect_uri = "http://localhost:3000/spotify";
var scopes = ["streaming user-read-private user-read-email"];
var response_type = "code";
const Login = () => {
    const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scopes=${scopes}&response_type=${response_type}`;
    return(
        <div>
            <a href = {url}>Click Here to Login</a>
        </div>
    );

}

export default Login;