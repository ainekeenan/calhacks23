var express = require('express');
var router = express.Router();

const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));


const  client_secret = '260b829228594aa1bcf33adcd50f8f16';

const  client_id = 'c71d9d2d1035480aa83549558035aa59';

const redirect_uri = 'http://localhost:3000/spotify';

const enc_base_64 = new Buffer.from(client_id+ ":" + client_secret);

const Authorization = "Basic " + enc_base_64.toString('base64');

router.get('/', function(req, res, next){
    const code = req.query.code;
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


    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        body: querystring.stringify({
            code: code,
            redirect_uri : redirect_uri,
            grant_type : 'authorization_code'
        }),
        headers:{
            'content_type' : "application/x-www-form-urlencoded",
            'Authorization': Authorization
        },
    }).then(response => res.send({message: response}))
    .catch(error => console.log(error))
  

})



module.exports = router;