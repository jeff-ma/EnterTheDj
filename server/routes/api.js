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
const redirectUri = 'http://localhost:3001/callback';

// Spotify api endpoints
const authorizeUrl = 'https://accounts.spotify.com/authorize?';
const userUrl = 'https://api.spotify.com/v1/me';
// const searchUrl = 'https://api.spotify.com/v1/search?type=track&limit=2&query=';
const searchUrl = 'https://api.spotify.com/v1/search?type=album,artist,track,playlist,show&market=us&locale=en&limit=50&q=';
const top50Url = 'https://api.spotify.com/v1/search?type=playlist&market=us&locale=en&limit=50&q=top 50';
const albumUrl = 'https://api.spotify.com/v1/albums/';
const artistUrl = 'https://api.spotify.com/v1/artists/';
const showUrl = 'https://api.spotify.com/v1/shows/';
const newReleasesUrl = 'https://api.spotify.com/v1/browse/new-releases?limit=50';
const categoriesUrl = 'https://api.spotify.com/v1/browse/categories/';
const mostPopularUrl = 'https://api.spotify.com/v1/playlists/4LZtDy62wDvQ4o8JB4UrcR';
const topSongsUrl = 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLRQDuF5jeBp';
const newShowsUrl = 'https://api.spotify.com/v1/search?q=%20:new&type=show&limit=16';
const recommendationUrl = "https://api.spotify.com/v1/recommendations";
const playlistsUrl = "https://api.spotify.com/v1/playlists/";
const userPlaylistsUrl = "https://api.spotify.com/v1/me/playlists";
const featuredPlaylistUrl = "https://api.spotify.com/v1/browse/featured-playlists";
const recentUrl = "https://api.spotify.com/v1/me/player/recently-played?limit=50";
const checkUserSavedTracksUrl = "https://api.spotify.com/v1/me/tracks/contains?ids=";
const checkUserSavedAlbumsUrl = "https://api.spotify.com/v1/me/albums/contains?ids=";
// const checkUserSavedPlaylistsUrl = "https://api.spotify.com/v1/me/albums/contains?ids=";
const checkUserSavedArtistsUrl = "https://api.spotify.com/v1/me/following/contains?type=artist&ids=";
const updateLibraryTracksUrl = "https://api.spotify.com/v1/me/tracks?ids=";
const saveRemoveAlbumUrl = "https://api.spotify.com/v1/me/albums?ids=";

// genius token
const geniusToken = 'WR1f5FtWUISyYj0Zd20aL5YZNuOnXr0otQ5mnND1nANzguPbIbZrkDYBeFX9YCNb';
// genius api endpoints
const geniusSearchUrl = 'https://api.genius.com/search?q=';
const geniusSongsUrl =  'https://api.genius.com/songs/';

// spotify api options
// const limit = 20;
const timeout = 30000;

async function spotifyApiCall(url, token, method = "get") {
    if (token || fs.existsSync('accessToken.txt')) {
        const accessToken = token || fs.readFileSync('accessToken.txt', 'utf8');
        try {
            const response = await axios({
                method: method,
                url: encodeURI(url),
                headers: {'Authorization': 'Bearer ' + accessToken},
                timeout: timeout
            });
            return response;
        } catch({response:{data:{error}}}) {
            console.log(error);
            return Promise.reject(error);
        }
    } else {
        return Promise.reject(new Error('spotify access token not found'));
    }
};

async function geniusApiCall(url) {
    return axios({
        method: 'get',
        url: encodeURI(url),
        headers: {'Authorization': 'Bearer ' + geniusToken},
        timeout: timeout
    });
};

async function addIsSavedToTracks(tracks, accessToken) {
    // spotify only allows checking up to 50 track ids at one time
    let total = 0;
    let savedTracksCheck = [];
    while (total < tracks.length) {
        const trackIds = tracks.slice(total, total + 50).map((track) => track.id);
        const response = await spotifyApiCall(checkUserSavedTracksUrl + trackIds.join(","), accessToken);
        savedTracksCheck = savedTracksCheck.concat(response.data);
        total = total + 50;
    }
    tracks.forEach((track, index) => {
        track.isSaved = savedTracksCheck[index];
    });
};

async function addAudioDataToTracks(tracks) {
    const accessToken = fs.readFileSync('accessToken.txt', 'utf8');
    let total = 0;
    let audioFeatures = [];
    while(total < tracks.length) {
        const trackIds = tracks.slice(total, total + 100).map((track) => track.id);
        const response = await spotifyApiCall("https://api.spotify.com/v1/audio-features?ids=" + trackIds.join(","));
        audioFeatures = audioFeatures.concat(response.data.audio_features);
        total = total + 100;
    }
    let promises = tracks.map((track, index) => axios.get("https://api.spotify.com/v1/audio-analysis/" + track.id, {headers: {'Authorization': 'Bearer ' + accessToken}}));
    const responses = await axios.all(promises);
    tracks.forEach((track, index) => {
        //loop each track and add audio features
        track.audioAnalysis = responses[index].data;
        track.audioFeatures = audioFeatures[index]; 
    });
}

async function getUserPlaylists(accessToken) {
    try {
        const response = await spotifyApiCall(`https://api.spotify.com/v1/users/${userId}/playlists`, accessToken);
        return resposne.data;
    } catch(error) {
        console.log(error);
    }
}

router.post('/audio_data', async (req, res) => {
    try {
        const accessToken = fs.readFileSync('accessToken.txt', 'utf8');
        const {tracks} = req.body;
        let total = 0;
        let audioFeatures = [];
        // max of 100 track ids for each audio features api call
        while(total < tracks.length) {
            const trackIds = tracks.slice(total, total + 100).map((track) => track.id);
            const response = await spotifyApiCall("https://api.spotify.com/v1/audio-features?ids=" + trackIds.join(","));
            audioFeatures = audioFeatures.concat(response.data.audio_features);
            total = total + 100;
        }
        let promises = tracks.map((track, index) => axios.get("https://api.spotify.com/v1/audio-analysis/" + track.id, {headers: {'Authorization': 'Bearer ' + accessToken}}));
        const responses = await axios.all(promises);
        tracks.forEach((track, index) => {
            //loop each track and add audio features
            track.audioAnalysis = responses[index].data;
            track.audioFeatures = audioFeatures[index]; 
        });
        res.send(tracks);
    } catch(error) {
        console.log(error);
        res.send(tracks);
    }
});

router.get('/album/:albumId', async (req, res) => {
    try {
    const accessToken = req.cookies.access_token;
    const album = await spotifyApiCall(albumUrl + req.params.albumId).then((response) => response.data);
    const artist = await spotifyApiCall(artistUrl + album.artists[0].id).then((response => response.data));
    const featuredArtists = new Map();
    let next = album.tracks.next;
    while (next) {
        // get the other tracks and combine them
        let tracks = await spotifyApiCall(next).then((response) => response.data);
        album.tracks.items = album.tracks.items.concat(tracks.items);
        next = tracks.next;
    }
    album.tracks.items.forEach((item) => {
        // iterate through each track and add each featured artist
        item.artists.forEach((artist) => {
            // add featured artist but not the album artist
            if(artist.id !== album.artists[0].id) {
                featuredArtists.set(artist.id, artist);
            }
        });
    });
    album.featuredArtists = Array.from(featuredArtists.values());
    album.artists[0] = artist;
    if (accessToken) {
        const response = await spotifyApiCall(checkUserSavedAlbumsUrl+req.params.albumId, accessToken);
        album.isSaved = response.data[0];
        await addIsSavedToTracks(album.tracks.items, accessToken);
    }
    res.status(200).send(album);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get('/artist/:artistId', async (req, res) => {
    try {
        const { artistId } = req.params;
        const accessToken = req.cookies.access_token;
        const responses = await axios.all([
            spotifyApiCall(artistUrl + artistId),
            spotifyApiCall(artistUrl + artistId + "/albums?include_groups=album&country=US&limit=50"),
            spotifyApiCall(artistUrl + artistId + "/albums?include_groups=single&country=US&limit=50"),
            spotifyApiCall(artistUrl + artistId + "/related-artists?limit=50"),
            spotifyApiCall(artistUrl + artistId + "/albums?include_groups=appears_on&country=US&limit=50"),
            spotifyApiCall(artistUrl + artistId + "/top-tracks?country=us"),
            // spotifyApiCall('https://api.spotify.com/v1/search?type=playlist&limit=50&q='),
            // spotifyApiCall(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=us&limit=50`),
            axios(`https://open.spotify.com/artist/${artistId}/about`),
        ]);
        // get recommendations
        const artist = responses[0].data;
        const albums = responses[1].data;
        const singles = responses[2].data;
        const relatedArtists = {items: responses[3].data.artists};
        const appearsOn = responses[4].data;
        const topTracks = {items: responses[5].data.tracks};
        const $ = cheerio.load(responses[6].data);
        const bioPrimary = $(".bio-primary span").html();
        const bioSecondary = $(".bio-secondary span").html();
        $("a").each((index, element) => {
            const href = $(element).attr("href");
            if (!href.startsWith("/album/") && !href.startsWith("/artist/")) {            
                const html = $(element).html();
                $(element).replaceWith(html);
            }
        });
        // let innerHtml = '<p class="bio-primary">' + $(".bio-primary span").html() + $(".bio-secondary span").first().html() + "</p>";
        let innerHtml = $(".bio-primary span").html() + $(".bio-secondary span").first().html();
        // $(".bio-primary").replaceWith('<p class="bio-primary">' + bioPrimary + $(".bio-secondary span").first().html() + "</p>");
        $(".bio-secondary").first().remove();
        $(".bio-secondary").each((index, element) => {
            // console.log(element);
            // const html = $(element).html();
            const html = $(element).children().first().html();
            // console.log($(element).children().first().html());
            // $(element).replaceWith('<p class="bio-secondary">' + html + "</p>");
            // console.log($(element).html());
            innerHtml = innerHtml + '<p class="bio-secondary">' + $(element).children().first().html() + "</p>";
        });
        if (innerHtml) {
            innerHtml = '<p class="bio-primary">' + innerHtml + '</p>';
        }
        // only allow links to albums and artist remove all other links
        // const bio = $(".bio").html();
        artist.monthlyListeners = $(".insights__column__number").first().html();
        // console.log(bio);
        // get tracks for the most recent album
        // get the latest
        let latest;
        if (albums.items.length > 0) {
            if (singles.items.length > 0) {
                // compare dates 
                const albumReleaseDate = new Date(albums.items[0].release_date);
                const singleReleaseDate = new Date(singles.items[0].release_date);
                if (albumReleaseDate.getTime() >= singleReleaseDate.getTime()) {
                    latest = albums.items[0];
                } else {
                    latest = singles.items[0];
                }
            } else {
                latest = albums.items[0];
            }
        } else {
            latest = singles.items[0];
        }

        // let latest = albums.items;
        await spotifyApiCall(albumUrl + latest.id).then(response => {latest.tracks = response.data.tracks});
        const playlists = await spotifyApiCall(`https://api.spotify.com/v1/search?type=playlist&limit=50&q=${artist.name}`).then(response => response.data.playlists);
        const response = await spotifyApiCall(`${recommendationUrl}?seed_artists=${artistId}&seed_genres=${artist.genres[0]}`);
        // await addAudioDataToTracks(topTracks.items);
        if (accessToken) {
            const response = await spotifyApiCall(checkUserSavedArtistsUrl + artist.id, accessToken);
            artist.isSaved = response.data[0];
            await addIsSavedToTracks(topTracks.items, accessToken);
        }
        res.status(200).send({artist, albums, singles, appearsOn, bio: innerHtml, latest, playlists, recommendations: response.data.tracks, relatedArtists, topTracks});
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get('/browse', async (req, res) => {
    const { limit = 20, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    try {
        const response = await spotifyApiCall(categoriesUrl + `?offset=${offset}&limit=${limit}`);
        res.status(200).send(response.data);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get('/category/:categoryId', async (req, res) => {
    const { limit = 20, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    try {
        const {categoryId} = req.params;
        const responses = await axios.all([
            spotifyApiCall(`${categoriesUrl}${categoryId}`),
            spotifyApiCall(`${categoriesUrl}${categoryId}/playlists?offset=${offset}&limit=${limit}`)
        ]);
        // const response = await spotifyApiCall(`${categoriesUrl}${categoryId}/playlists`);
        const { playlists } = responses[1].data; 
        playlists.name = responses[0].data.name;
        res.status(200).send(playlists);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get('/embed/:audioType/:audioId', async (req,res)=> {
    try {
        const { audioId, audioType } = req.params;
        const response = await axios(`https://open.spotify.com/embed/${audioType}/${audioId}`);
        res.cookie("sp_ab", "%7B%7D", {maxAge: 3600000});
        res.cookie("sp_dc", "AQAvU5FLAkYseqxCBVSZu7SOyU1vwcvAZD4A_szvtNAXHw3YFXIQNzwIGUNdEQ0AimB0dcJ0v6ils8H4UfMQcNB0tYed1-5Cn4iHW3Od0kI", {maxAge: 3600000});
        res.cookie("sp_key", "f2b0978c-d2a6-4a6b-bda3-f72dcf6ac5ea", {maxAge: 3600000});
        res.cookie("sp_landing", "http%3A%2F%2Fopen.spotify.com%2Fembed%2Ftrack%2F0pPK8B24PaXj5Hn7F1ZZB7", {maxAge: 3600000});
        res.cookie("sp_t", "7ab8673cbd71696b8d23f97b0e06f76e", {maxAge: 3600000});
        res.send(response.data).status(200);
    } catch(error) {
        res.send(error);
    }
});

router.get('/home', async (req, res) => {
    let genres = fs.readFileSync("genres.txt", "utf8");
    genres = genres.split(" ").sort(() => 0.5 - Math.random()).slice(0,5);
    try {
        const responses = await axios.all([
            spotifyApiCall(newReleasesUrl),
            spotifyApiCall(mostPopularUrl),
            spotifyApiCall(topSongsUrl),
            spotifyApiCall(newShowsUrl),
            spotifyApiCall(top50Url),
            spotifyApiCall(featuredPlaylistUrl),
            spotifyApiCall(`https://api.spotify.com/v1/recommendations?seed_genres=${genres.join()}`),
        ]);
        const featured = [...responses[0].data.albums.items].sort(() => 0.5 - Math.random()).slice(0,7);
        const albums = responses[0].data.albums.items.splice(0, 16);
        const mostPopular = responses[1].data.tracks.items.splice(0, 16);
        // const categories = responses[1].data.categories.items;
        const topSongs = responses[2].data.tracks.items.splice(0, 16);
        const newShows = responses[3].data.shows.items;
        const top50 = responses[4].data.playlists.items.filter(item => item.name.includes("Top 50")).splice(0, 16);
        const featuredPlaylists = responses[5].data.playlists.items.splice(0, 16);
        const recommends = responses[6].data.tracks.map((track) => track.album).splice(0, 16);
        res.status(200).send({ featured, albums, mostPopular, topSongs, newShows, top50, featuredPlaylists, recommends});
    } catch(error) {
        res.status(error.status).send(error);
    }
});

// router.get('/library', async (req, res) => {
//     try {
//         const accessToken = req.cookies.access_token;
//         // const {accessToken} = req.body;        
//         const responses = await axios.all([
//             spotifyApiCall(userUrl + '/albums', accessToken),
//             spotifyApiCall(userUrl + '/tracks', accessToken),
//             spotifyApiCall(userPlaylistsUrl, accessToken),
//             spotifyApiCall(userUrl + '/following?type=artist', accessToken)
//         ]);
//         const albums = responses[0].data;
//         const tracks = responses[1].data;
//         const playlists = responses[2].data;
//         const artists = responses[3].data.artists;
//         // modify object to conform to standard structure
//         albums.items = albums.items.map((item) => item.album);
//         tracks.items = tracks.items.map((item) => item.track);
//         await addIsSavedToTracks(tracks.items, accessToken);
//         // await addAudioDataToTracks(tracks.items);
//         res.status(200).send({albums, tracks, playlists, artists});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.delete('/library/album', async (req, res) => {
//     try {
//         const { accessToken, albumId } = req.body;
//         const response = await spotifyApiCall(saveRemoveAlbumUrl+albumId, accessToken, "delete");
//         res.status(response.status).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.put('/library/album', async (req, res) => {
//     try {
//         const { accessToken, albumId } = req.body;
//         const response = await spotifyApiCall(saveRemoveAlbumUrl+albumId, accessToken, "put");
//         res.status(response.status).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.delete('/library/playlist', async (req,res) => {
//     try {
//         const {playlistId} = req.body;
//         const response = await spotifyApiCall(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, req.cookies.access_token, "delete");
//         res.status(response.status).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.put('/library/playlist', async (req,res) => {
//     try {
//         const {playlistId} = req.body;
//         const response = await spotifyApiCall(`https://api.spotify.com/v1/playlists/${playlistId}/followers`, req.cookies.access_token, "put");
//         res.status(response.status).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.delete('/library/tracks', async (req, res) => {
//     try {
//         const {accessToken, trackId} = req.body;
//         const response = await spotifyApiCall(updateLibraryTracksUrl+trackId, accessToken, "delete");
//         // const responses = await axios.all([
//         //     spotifyApiCall(userUrl + '/albums', accessToken),
//         //     spotifyApiCall(userUrl + '/tracks', accessToken)
//         // ]);
//         // res.status(200).send({albums: responses[0].data, tracks: responses[1].data});
//         // res.send("ok");
//         res.status(200).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

// router.put('/library/tracks', async (req, res) => {
//     try {
//         const {accessToken, trackId} = req.body;        
//         // const response = await axios({
//         //     method: 'PUT',
//         //     url: encodeURI(updateLibraryTracksUrl+trackId),
//         //     headers: {'Authorization': 'Bearer ' + accessToken},
//         //     timeout: timeout
//         // });
//         const response = await spotifyApiCall(updateLibraryTracksUrl+trackId, accessToken, "PUT");
//         // const responses = await axios.all([
//         //     spotifyApiCall(userUrl + '/albums', accessToken),
//         //     spotifyApiCall(userUrl + '/tracks', accessToken)
//         // ]);
//         // res.status(200).send({albums: responses[0].data, tracks: responses[1].data});
//         res.status(200).send({});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

router.post('/lyrics', async (req, res) => {
    const { tracks } = req.body;
    try {
        // const { tracks } = req.body;
        const promises = tracks.map(async (track) => {
            const searchResults = await geniusApiCall(geniusSearchUrl + track.artists[0].name + " " + track.name);
                if(searchResults.data.response.hits.length > 0 && track.artists[0].name.toLowerCase() === searchResults.data.response.hits[0].result.primary_artist.name.toLowerCase()) {
                    // find the url for genuis web page containing lyrics
                    const geniusLyricsUrl = searchResults.data.response.hits[0].result.url;
                    // scrape genuis webpage for lyrics
                    const geniusLyricsPage = await axios(geniusLyricsUrl);
                    const $ = cheerio.load(geniusLyricsPage.data);
                    $(".lyrics a").each((index, element) => {
                        const html = $(element).html();
                        $(element).replaceWith(html);
                    });
                    return {
                        lyrics: $(".lyrics").html(),
                        video: $(".videos").html()
                    };
                } else {
                    return {lyrics: null, video: null};
                }
        });
        const results = await Promise.all(promises);
        tracks.forEach((track, index) => {
            track.lyrics = results[index].lyrics;
            track.video = results[index].video;
        });
        res.status(200).send(tracks);
    } catch(error) {
        res.status(200).send(tracks);
    }
});

router.get('/playlist/:playlistId', async (req, res) => {
    try {
        const accessToken = req.cookies.access_token;
        const response = await spotifyApiCall(playlistsUrl + req.params.playlistId);
        const playlist = response.data;
        let next = playlist.tracks.next;
        playlist.tracks.items = playlist.tracks.items.map(item => item.track);
        while (next) {
            let tracks = await spotifyApiCall(next).then((response) => response.data);
            let items = tracks.items.map((item) => item.track);
            playlist.tracks.items = playlist.tracks.items.concat(items);
            next = tracks.next;
        }
        // await addAudioDataToTracks(playlist.tracks.items);     
        if (accessToken) {
            // check if playlist belongs to user            
            const response = await spotifyApiCall(`https://api.spotify.com/v1/playlists/${req.params.playlistId}/followers/contains?ids=${req.cookies.id}`, req.cookies.access_token);
            playlist.isSaved = response.data[0];
            await addIsSavedToTracks(playlist.tracks.items, accessToken);
        }
         res.status(200).send(playlist);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.post('/playlists', async (req, res) => {
    try {
        const {accessToken} = req.body;
        // let response, responses;
        if (accessToken) {
             const responses = await axios.all([
                spotifyApiCall(featuredPlaylistUrl, accessToken),
                spotifyApiCall(userPlaylistsUrl, accessToken)             
            ]);
            res.status(200).send({featuredPlaylists: responses[0].data.playlists, userPlaylists: responses[1].data});
            // res.status(200).send({userPlaylists: responses[0].data, featuredPlaylists: responses[1].data})
        } else {
            const response = await spotifyApiCall(featuredPlaylistUrl);
            res.status(200).send({featuredPlaylists: response.data.playlists});
            // const featuredPlaylists = response.data;
            // response = {featuredPlaylists};
        }
    } catch(error) {
        res.status(error.status).send(error);
    }
});

// router.post('/recent', async (req, res) => {
//     try {
//         const response = await spotifyApiCall(recentUrl, req.body.accessToken);
//         const tracks = response.data.items.map((item) => item.track);
//         await addIsSavedToTracks(tracks, req.body.accessToken);
//         // await addAudioDataToTracks(tracks);
//         // const recentTrackIds = tracks.map((track) => track.id);
//         // const savedTracksCheck = await spotifyApiCall(checkUserSavedTracksUrl + recentTrackIds.join(","), req.body.accessToken);
//         // tracks.forEach((track, index) => {
//         //     track.isSaved = savedTracksCheck.data[index];
//         // });
//         response.data.items = tracks;
//         res.status(200).send(response.data);
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

router.get('/search', async (req,res) => {
    try {
        const accessToken = req.cookies.access_token;
        // const { q } = req.query;    
        const response = await spotifyApiCall(searchUrl + req.query.q);
        // console.log(response.data);
        // if no items do not send as response
        const searchResults = {};
        for (let key in response.data) {
            if (response.data[key].total > 0) {
                searchResults[key] = response.data[key];
            }
        }
        // await addAudioDataToTracks(searchResults.tracks.items);   
        if (accessToken && searchResults.tracks) {
            await addIsSavedToTracks(searchResults.tracks.items, accessToken);
        }
        res.status(response.status).send(searchResults);
    }
    catch(error) {
        res.status(error.status).send(error);
    }
});

router.get('/show/:showId', async (req, res) => {
    try {
        const { showId } = req.params;
        const response = await spotifyApiCall(showUrl + showId);
        res.status(response.status).send(response.data);
    }
    catch(error) {
        res.status(error.status).send(error);
    }
});

// router.post('/top', async (req, res) => {
//     try {
//         const {accessToken} = req.body;
//         const responses = await axios.all([
//             spotifyApiCall(userUrl + '/top/artists?limit=50', accessToken),
//             spotifyApiCall(userUrl + '/top/tracks?limit=50', accessToken)
//         ]);
//         const tracks = responses[1].data;
//         await addIsSavedToTracks(responses[1].data.items, accessToken);
//         // await addAudioDataToTracks(responses[1].data.items);
//         res.status(200).send({artists: responses[0].data, tracks: responses[1].data});
//     } catch(error) {
//         res.status(error.status).send(error);
//     }
// });

module.exports = router;