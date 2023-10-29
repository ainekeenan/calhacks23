var express = require('express');
var router = express.Router();
const axios = require('axios');
var querystring = require('querystring');


const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


const  client_secret = '260b829228594aa1bcf33adcd50f8f16';

const  client_id = 'c71d9d2d1035480aa83549558035aa59';

const redirect_uri = 'http://localhost:9000/token';

const enc_base_64 = new Buffer.from(client_id+ ":" + client_secret);

const Authorization = "Basic " + enc_base_64.toString('base64');

router.get('/', function(req, res, next){
    const code = req.query.code;
    console.log(code);
    const url = 'https://accounts.spotify.com/api/token';
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        body: {
            code: code,
            redirect_uri : redirect_uri,
            grant_type : 'authorization_code'
        },
        headers:{
            'content_type' : "application/x-www-form-urlencoded",
            'Authorization': Authorization
        },
        json: true
    };
    /*console.log(querystring.stringify({
        code: code,
        redirect_uri : redirect_uri,
        grant_type : 'authorization_code'
    })); */

   
    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: querystring.stringify({
            code: code,
            redirect_uri : redirect_uri,
            grant_type : 'authorization_code'
        }),
        headers:{
            'content_type' : "application/x-www-form-urlencoded",
            'Authorization': Authorization
        },
    }).then(response => {
        const { access_token, token_type } = response.data;
        console.log(access_token);
        console.log("dogs");
        const go_back = 'http://localhost:3000/spotify';
        
        axios.get("https://api.spotify.com/v1/me", {headers: {
            Authorization: 'Bearer ' + `${access_token}`
        }}).then(response => {
            if(response.status == 200){
                res.send(`<pre> <h1>Data about your spotify account</h1> ${JSON.stringify(response.data, null,2)}<a href = ${go_back}>Click Here to go back</a>}</pre>`);
            } else{
                res.send(response);
            }
        }) .catch(error => console.log(error));
      
        
    }).catch(error => console.log(error))
    
    /*.then(response => {
        if(response.status === 200) {
            res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
          } else {
            res.send(response);
          } }) */
  

})



module.exports = router;