const express = require('express');
const router = express.Router();
const request = require('request');
const session = require('express-session');
const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// Spotify api credentials
const clientId = '2d6223f5a7d74315a03e819aee4e3934';
const clientSecret = '59a5341f9642466ab0e0cb00eb00ac7c';
const redirectUri = 'http://localhost:3000/callback';

// Spotify api endpoints
const authorizeUrl = 'https://accounts.spotify.com/authorize?';
// const tokenUrl = 'https://accounts.spotify.com/api/token';
const userUrl = 'https://api.spotify.com/v1/me';
// const searchUrl = 'https://api.spotify.com/v1/search?type=track&limit=2&query=';
const searchUrl = 'https://api.spotify.com/v1/search?type=album,artist,track,playlist,show&market=us&locale=en&limit=10&q=';
const albumUrl = 'https://api.spotify.com/v1/albums/';
const artistUrl = 'https://api.spotify.com/v1/artists/';
const showUrl = 'https://api.spotify.com/v1/shows/';
const newReleasesUrl = 'https://api.spotify.com/v1/browse/new-releases?limit=50';
const categoriesUrl = 'https://api.spotify.com/v1/browse/categories/';
const mostPopularUrl = 'https://api.spotify.com/v1/playlists/4LZtDy62wDvQ4o8JB4UrcR';
const topSongsUrl = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp';
const newShowsUrl = 'https://api.spotify.com/v1/search?q=%20:new&type=show&limit=10';
const recommendationUrl = "https://api.spotify.com/v1/recommendations";
const playlistsUrl = "https://api.spotify.com/v1/playlists/";
const userPlaylistsUrl = "https://api.spotify.com/v1/me/playlists";
// const userTopUrl = "https://api.spotify.com/v1/me/top";

// genius token
const geniusToken = 'WR1f5FtWUISyYj0Zd20aL5YZNuOnXr0otQ5mnND1nANzguPbIbZrkDYBeFX9YCNb';
// genius api endpoints
const geniusSearchUrl = 'https://api.genius.com/search?q=';
const geniusSongsUrl =  'https://api.genius.com/songs/';

// apiseeds
// const apiseeds = "https://orion.apiseeds.com/api/music/lyric/:artist/:track";
// const apiseedsKey = "QzCbUfL48wUcxCF9KrVaecMgkt2RX4JMztAzHNiOQfV1NGDF5Bw60wY7kRgiEZvt"

// spotify api options
// const limit = 5;

async function spotifyApiCall(url, token) {
    if (token || fs.existsSync('accessToken.txt')) {
        const accessToken = token || fs.readFileSync('accessToken.txt', 'utf8');
        return axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + accessToken}
        });
    } else {
        return Promise.reject(new Error('spotify access token not found'));
    }
};

async function geniusApiCall(url) {
        return axios({
            method: 'get',
            url: url,
            headers: {'Authorization': 'Bearer ' + geniusToken}
        });
}

// too slow
// async function apiseedsCall(artist, track) {
//     let url = "https://orion.apiseeds.com/api/music/lyric/:artist/:track"
//     return axios("https://orion.apiseeds.com/api/music/lyric/" + artist + "/" + track + "?apikey=" + apiseedsKey);
// }
router.get('/test', function(req, res){
    if(req.session.page_views){
       req.session.page_views++;
       res.cookie("visits", req.session.page_views).send("You visited this page " + req.session.page_views + " times");
    } else {
       req.session.page_views = 1;
       res.cookie("visits", req.session.page_views).send("Welcome to this page for the first time!");
    }
 });



router.get('/embed/:audioType/:audioId', async (req,res)=> {
    const { audioId, audioType } = req.params;
     let player = await axios(`https://open.spotify.com/embed/${audioType}/${audioId}`).then(response => response.data);
     res.send(player).status(200);
});


router.get('/home', (req, res) => {
        return axios.all([
            spotifyApiCall(newReleasesUrl),
            spotifyApiCall(mostPopularUrl),
            spotifyApiCall(topSongsUrl),
            spotifyApiCall(newShowsUrl),
        ])
        .then(responses => {
            const featured = [...responses[0].data.albums.items].sort(() => 0.5 - Math.random()).slice(0,4);
            const albums = responses[0].data.albums.items.splice(0, 10);
            const mostPopular = responses[1].data.tracks.items.splice(0, 10);
            // const categories = responses[1].data.categories.items;
            const topSongs = responses[2].data.tracks.items.splice(0, 10);
            const newShows = responses[3].data.shows.items;
            // res.status(200).send("response.data");
            res.status(200).send({ featured, albums, mostPopular, topSongs, newShows});
        })
        .catch(error => {
            console.log(error);
            console.log("Whoa looks like there was an error");
            res.status(500).send(error);
        });
});

router.get('/album/:albumId', (req, res) => {
    let album;
    const promises = [];
    // const featuredArtist =[];
    //get lyrics
        // maybe get recommendations
    return spotifyApiCall(albumUrl + req.params.albumId)
    .then((response) => {
        album = response.data;
        const tracks = album.tracks.items;
        // const featuredArtists = [];
        let featuredArtists = new Map();
        tracks.forEach((track) => {
            // convert track duration from milliseconds to time
            const minutes = Math.floor(track.duration_ms / 60000);
            const seconds = Math.floor((track.duration_ms % 60000) / 1000).toFixed(0);
            if(seconds === 60) {
                minutes = minutes + 1;
                seconds = 0;
            }
            track.duration_time = minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            // group featured artist objects
            track.artists.forEach((artist) => {
                if(artist.id !== album.artists[0].id) {
                    featuredArtists.set(artist.id, artist);
                }
            });
        });
        album.lyricsAvailable = false;
        album.names="test";
        album.featuredArtists = Array.from(featuredArtists.values());
        res.status(response.status).send(album);
    })
    .catch(error => {
        console.log(error);
        res.status(500).send(error);
    });
});

router.get('/artist/:artistId', (req, res) => {
    // get the album details and tracks
    // "1GYVNOzwhx1nMcIJDogSNp"
    
    const { artistId } = req.params;
        return axios.all([
            spotifyApiCall(artistUrl + artistId),
            spotifyApiCall(artistUrl + artistId + "/albums?include_groups=album&limit=50"),
            axios(`https://open.spotify.com/artist/${artistId}/about`)
        ])
        .then((responses) => {
            // get recommendations
            console.log("getting recommendations...");
            const artist = responses[0].data;
            const albums = responses[1].data.items;
            // const bio = responses[2].data;
            // get the bio from spotify artist about page
            let $ = cheerio.load(responses[2].data);
            let bioPrimary = $(".bio-primary span").html();
            let bioSecondary = $(".bio-secondary span").first().html();
            $("a").each((index, element) => {
                const html = $(element).html();
                $(element).replaceWith(html);
            });
            $(".bio-primary").replaceWith('<p class="bio-primary"><span dir="auto">' + bioPrimary + bioSecondary + "</span></p>");
            $(".bio-secondary").first().remove();
            $(".bio-secondary").each((index, element) => {
                const html = $(element).html();
                $(element).replaceWith('<p class="bio-secondary">' + html + "</p>");
            });
            let bio = $(".bio").html();

            return spotifyApiCall(
                recommendationUrl +
                "?seed_artists=" + artistId + 
                "&seed_genres=" + artist.genres[0]
            )
            .then((response) => {
                console.log("sending recommendations");
                // console.log(response.data.tracks);
                res.status(200).send({artist, albums, bio, recommendations: response.data.tracks});
            });
        }
    );
});

router.get('/browse', (req, res) => {
    return spotifyApiCall(categoriesUrl)
    .then((response) => {
        res.status(200).send(response.data);
    });
});

router.get('/category/:categoryId', (req, res) => {
    const {categoryId} = req.params;
    return spotifyApiCall(`${categoriesUrl}${categoryId}/playlists`)
    .then(response => {
        res.status(200).send(response.data.playlists);
    });
});

router.post('/favorites', (req, res) => {
    const {accessToken} = req.body;
    return axios.all([
        spotifyApiCall(userUrl + '/albums', accessToken),
        spotifyApiCall(userUrl + '/tracks', accessToken)
    ])
    .then(responses => {
        res.status(200).send({albums: responses[0].data, tracks: responses[1].data});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.post('/lyrics', async (req, res) => {
    console.log("getting lyrics");
    let { tracks } = req.body;
    try {
        let promises = tracks.map((track) => {
            return geniusApiCall(geniusSearchUrl + track.artists[0].name + " " + track.name)
            .then((searchResults) => {
                if(searchResults.data.response.hits.length > 0 && track.artists[0].name.toLowerCase() === searchResults.data.response.hits[0].result.primary_artist.name.toLowerCase()) {
                    let geniusLyricsUrl = searchResults.data.response.hits[0].result.url;
                    console.log(geniusLyricsUrl);
                    return axios(geniusLyricsUrl)
                    // return axios('https://open.spotify.com/artist/1ZwdS5xdxEREPySFridCfh/about')
                    .then((geniusLyricsPage) => {
                        // console.log(geniusLyricsPage.data);
                        let $ = cheerio.load(geniusLyricsPage.data);
                        let videos = $(".videos").html();
                        console.log(videos);
                        // console.log($.html());
                        // let lyrics = $(".lyrics a");
                        $(".lyrics a").each((index, element) => {
                            const html = $(element).html();
                            $(element).replaceWith(html);
                        });
                        // console.log(lyrics);
                        // return $(".lyrics").html();
                        // console.log($.html());
                        return {
                            lyrics: $(".lyrics").html(),
                            video: $(".videos").html()
                        };
                    });
                } else {
                    // return "<p>No lyrics found :(</p>";
                    return {lyrics: null, video: null};
                }
            });
        });
        let results = await Promise.all(promises);
        tracks.forEach((track, index) => {
            track.lyrics = results[index].lyrics;
            track.video = results[index].video;
        });
        res.status(200).send(tracks);
    } catch(error) {
        console.log(error);
        res.status(200).send("No lyrics available");
    }
});

router.get('/playlist/:playlistId', (req, res) => {
    return spotifyApiCall(playlistsUrl + req.params.playlistId)
    .then(response => {
        // assign tracks to response
        let playlist = response.data;
        let tracks = playlist.tracks.items.map(item => item.track);
        playlist.tracks.items = tracks;
        // playlist.tracks.items.forEach((item) => {
        //     item = item.track;
        // });
        res.status(200).send(playlist);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.post('/playlists', (req, res) => {
    const {accessToken} = req.body;
    return spotifyApiCall(userPlaylistsUrl, accessToken)
    .then(response => {
        res.status(200).send(response.data);
    })
    .catch(error => {
        res.status(500).send(error)
    });
});

router.get('/search', (req,res) => {
    const { q } = req.query;
    console.log(req.query);
    return spotifyApiCall(searchUrl + q)
    .then(response => {
        res.status(response.status).send(response.data);
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

router.get('/show/:showId', (req, res) => {
    const { showId } = req.params;
    return spotifyApiCall(showUrl + showId)
        .then((response) => {
            res.status(response.status).send(response.data);
        })
        .catch(error => {
            res.status(500).send(error);
        });
});

router.post('/top', (req, res) => {
    const {accessToken} = req.body;
    return axios.all([
        spotifyApiCall(userUrl + '/top/artists', accessToken),
        spotifyApiCall(userUrl + '/top/tracks', accessToken)
    ])
    .then(responses => {
        res.status(200).send({artists: responses[0].data, tracks: responses[1].data});
    })
    .catch(error => {
        res.status(500).send(error);
    });
});

module.exports = router;