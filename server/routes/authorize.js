const express = require("express");
const router = express.Router();
const fs = require("fs");
const querystring = require("querystring");
const axios = require("axios");
const clientId = "2d6223f5a7d74315a03e819aee4e3934";
const clientSecret = fs.readFileSync("clientSecret.txt", "utf8");
const tokenUrl = "https://accounts.spotify.com/api/token";

function requestSpotifyToken(code, redirectUri) {
    return axios({
        method: "post",
        url: tokenUrl,
        params: {
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: redirectUri,
            code: code,
            grant_type: "authorization_code"
        },
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded"
        }
    });
}

// spotify calls back this route after authenticating and gives the access token of the user logging in
router.get("/authorize", async (req, res) => {
    try {
        const {data} = await requestSpotifyToken(req.query.code, req.query.state);
        const {access_token, refresh_token} = data;
        const user = await axios({
            method: "get",
            url: "https://api.spotify.com/v1/me",
            headers: {"Authorization": "Bearer " + access_token}
        });
        if(user.data.images.length > 0) {
            res.cookie("image_url", user.data.images[0].url, {maxAge: 3600000});
        }
        if(user.data.product === "premium") {
            res.cookie("product", "premium");
        } else {
            res.cookie("product", "free");
        }
        res.cookie("birthdate", user.data.birthdate, {maxAge: 3600000});
        res.cookie("country", user.data.country, {maxAge: 3600000});
        res.cookie("display_name", user.data.display_name, {maxAge: 3600000});
        res.cookie("email", user.data.email, {maxAge: 3600000});
        res.cookie("spotify_url", user.data.external_urls.spotify, {maxAge: 3600000});
        res.cookie("followers", user.data.followers.total, {maxAge: 3600000}); 
        res.cookie("id", user.data.id, {maxAge: 3600000});
        res.cookie("access_token", access_token, {maxAge: 3600000, httpOnly: false});
        res.cookie("refresh_token", refresh_token, {maxAge: 3600000, httpOnly: false});
        res.redirect("/");
    } catch(error) {
        console.log(error.response.data);
        res.send(error);
    }
});

// spotify calls back this route after authenticating the application and gives a token that belongs to the application not the user
// this token is used for making spotify api calls for features not requiring user login
router.get("/callback", async (req, res) => {
    const redirectUri = req.query.state || `${req.protocol}://${req.headers.host}/callback`;
    try {
        const {data} = await requestSpotifyToken(req.query.code, redirectUri);
        fs.writeFileSync("accessToken.txt", data.access_token, "utf8");
        fs.writeFileSync("refreshToken.txt", data.refresh_token, "utf8");
        res.redirect("/");
    } catch(error) {
        console.log(error.response.data);

        res.send(error);
        
    }
});

// application needs to get access token or refresh access token
router.get("*", async (req, res, next) => {
    try {
        let accessToken;
        let refreshToken;
        if(fs.existsSync("accessToken.txt")) {
            accessToken = fs.readFileSync("accessToken.txt", "utf8");
        }
        if(fs.existsSync("refreshToken.txt")) {
            refreshToken = fs.readFileSync("refreshToken.txt", "utf8");
        }
        if(accessToken && refreshToken) {
            const response = await axios({
                method: "post",
                url: tokenUrl,
                params: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    refresh_token: refreshToken,
                    grant_type: "refresh_token"
                  },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                }
            });
            if(response.status === 200) {      
                accessToken = response.data.access_token;
                fs.writeFileSync("accessToken.txt", accessToken, "utf8");
                next();
            } else {
                return new Error("There was an error fetching data");
            }
        } else {
            // redirect to spotify login
            const query = querystring.stringify({
                response_type: "code",
                client_id: clientId,
                redirect_uri: `${req.protocol}://${req.headers.host}/callback`
            });
            res.redirect(`https://accounts.spotify.com/authorize?${query}`);
        }
    } catch(error) {
        console.log(error.response.data);
        res.send(error);
    }
});

module.exports = router;