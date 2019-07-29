const express = require('express');
const router = express.Router();
// const session = require('express-session');
const path = require('path');
const fs = require('fs');
const querystring = require('querystring');
const axios = require('axios');

const clientId = '2d6223f5a7d74315a03e819aee4e3934';
const clientSecret = '59a5341f9642466ab0e0cb00eb00ac7c';
const redirectUri = 'http://localhost:3000/callback';
const authorizeUrl = 'https://accounts.spotify.com/authorize?';
const tokenUrl = 'https://accounts.spotify.com/api/token';

// Spotify calls back this route after authenticating
// router.get('/callback', (req,res,next) => {
//     console.log(req.query);
//     res.send(req.query);
// });
router.get('/callback', (req, res, next) => {
    return axios({
        method: 'post',
        url: tokenUrl,
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: req.query.code,
            grant_type: 'authorization_code'
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then((response)=> {
        fs.writeFileSync('accessToken.txt', response.data.access_token, 'utf8');
        fs.writeFileSync('refreshToken.txt', response.data.refresh_token, 'utf8');
        res.redirect('/');
    })
    .catch((error)=> {
        res.send(error);
    });
});

router.get('/authorize', (req,res,next) => {
    // get the token from spotify and get user credentials
    axios({
        method: 'post',
        url: tokenUrl,
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: "http://localhost:3000/authorize",
            code: req.query.code,
            grant_type: 'authorization_code'
        },
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    })
    .then((response)=> {
        // req.session.loggedIn = true;
        const { access_token, refresh_token } = response.data;
        // set cookies for access and refresh tokens
        res.cookie("access_token", access_token, {maxAge: 3600000, httpOnly: false});
        res.cookie("refresh_token", refresh_token, {maxAge: 3600000, httpOnly: false});
        return axios({
            method: 'get',
            url: 'https://api.spotify.com/v1/me',
            headers: {'Authorization': 'Bearer ' + access_token}
        });
        // res.redirect('/login');
    })
    .then((response)=> {
        // set cookies for spotify user info
        if(response.data.images.length > 0){
            res.cookie("image_url", response.data.images[0].url, {maxAge: 3600000});
        }
        if(response.data.product === "premium") {
            res.cookie("product", "premium");
        } else {
            res.cookie("product", "free");
        }
        res.cookie("birthdate", response.data.birthdate, {maxAge: 3600000});
        res.cookie("country", response.data.country, {maxAge: 3600000});
        res.cookie("display_name", response.data.display_name, {maxAge: 3600000});
        res.cookie("email", response.data.email, {maxAge: 3600000});
        res.cookie("spotify_url", response.data.external_urls.spotify, {maxAge: 3600000});
        res.cookie("followers", response.data.followers.total, {maxAge: 3600000}); 
        res.cookie("id", response.data.id, {maxAge: 3600000});
        
        res.redirect('/');
    });
});

router.get('/logout', (req,res) => {
    // no way to logout from spotify web and redirect to this app, just clear cookies 
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.clearCookie("birthdate");
    res.clearCookie("country");
    res.clearCookie("display_name");
    res.clearCookie("email");
    res.clearCookie("id");
    res.clearCookie("followers");
    res.clearCookie("image_url");
    res.clearCookie("product");
    res.clearCookie("spotify_url");
    res.redirect('/');
});

// Application needs to get access token or refresh access token
router.get('*', (req, res, next) => {
    let accessToken;
    let refreshToken;
    if(fs.existsSync('accessToken.txt')) {
        accessToken = fs.readFileSync('accessToken.txt', 'utf8');
    }
    if(fs.existsSync('refreshToken.txt')) {
        refreshToken = fs.readFileSync('refreshToken.txt', 'utf8');
    }
    if(accessToken && refreshToken) {
        // refresh token
        return axios({
            method: 'post',
            url: tokenUrl,
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                refresh_token: refreshToken,
                grant_type: 'refresh_token'
              },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                // 'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64'))
            }
        })
        .then((response) => {
            if(response.status === 200) {        
                accessToken = response.data.access_token;
                fs.writeFileSync('accessToken.txt', accessToken, 'utf8');
                next();
            } else {
                // console.log(response.data);
                console.log("Refresh failed!");
                return new Error("There was an error fetching data");
            }
        });
    } else {
        // redirect to spotify login
        console.log("Redirecting to spotify login");
        const query = querystring.stringify({
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectUri
        });
        res.redirect(authorizeUrl + query);
    }
});

module.exports = router;