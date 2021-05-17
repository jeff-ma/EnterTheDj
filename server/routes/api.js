const express = require("express");
const router = express.Router();
const axios = require("axios");
const fs = require("fs");
const cheerio = require("cheerio");
const timeout = 20000;

function spotifyApiCall(url, token, method = "get") {
    if (token || fs.existsSync("accessToken.txt")) {
        const accessToken = token || fs.readFileSync("accessToken.txt", "utf8");
        try {
            return axios({
                method: method,
                url: encodeURI(`https://api.spotify.com/v1${url}`),
                headers: {"Authorization": `Bearer ${accessToken}`},
                timeout: timeout
            });
        } catch(error) {
            return Promise.reject(error.response.data.error);
        }
    } else {
        return Promise.reject(new Error("spotify access token not found"));
    }
}

async function addIsSavedToTracks(tracks, accessToken) {
    // spotify only allows checking up to 50 track ids at one time
    let total = 0;
    let isTracksSaved = [];
    while (total < tracks.length) {
        const trackIds = tracks.slice(total, total + 50).map((track) => track.id);
        const {data} = await spotifyApiCall("/me/tracks/contains?ids=" + trackIds.join(","), accessToken);
        isTracksSaved = isTracksSaved.concat(data);
        total = total + 50;
    }
    tracks.forEach((track, index) => {
        track.isSaved = isTracksSaved[index];
    });
}

router.post("/audio_data", async (req, res) => {
    const {tracks} = req.body;
    try {
        let total = 0;
        let audioFeatures = [];
        // spotify allows max of 100 track ids for each audio features api call
        while (total < tracks.length) {
            const trackIds = tracks.slice(total, total + 100).map((track) => track.id);
            const {data} = await spotifyApiCall("/audio-features?ids=" + trackIds.join(","));
            audioFeatures = audioFeatures.concat(data.audio_features);
            total = total + 100;
        }
        const promises = tracks.map((track) => spotifyApiCall("/audio-analysis/" + track.id));
        let responses = await Promise.all(promises);
        tracks.forEach((track, index) => {
            // add audio features and audio analysis to each track
            track.audioAnalysis = responses[index].data;
            track.audioFeatures = audioFeatures[index]; 
        });
        res.send(tracks);
    } catch(error) {
        res.send(tracks);
    }
});

router.get("/album/:albumId", async (req, res) => {
    try {
    const accessToken = req.cookies.access_token;
    const album = await spotifyApiCall("/albums/" + req.params.albumId).then((response) => response.data);
    const artist = await spotifyApiCall("/artists/" + album.artists[0].id).then((response => response.data));
    const featuredArtists = new Map();
    let {limit, next} = album.tracks;
    let offset = limit;
    while (next) {
        // spotify limits album tracks to 50 per api call need to get other album tracks and add them in album tracks
        let tracks = await spotifyApiCall(`/albums/${req.params.albumId}/tracks?offset=${offset}&limit=${limit}`).then((response) => response.data);
        album.tracks.items = album.tracks.items.concat(tracks.items);
        offset = offset + limit;
        next = tracks.next;
    }
    /* TODO: add featured artists later */
    album.tracks.items.forEach((item) => {
        item.artists.forEach((artist) => {
            // add each featured artist but not album artist
            if (artist.id !== album.artists[0].id) {
                featuredArtists.set(artist.id, artist);
            }
        });
    });
    album.featuredArtists = Array.from(featuredArtists.values());
    album.artists[0] = artist;
    if (accessToken) {
        const response = await spotifyApiCall("/me/albums/contains?ids="+req.params.albumId, accessToken);
        album.isSaved = response.data[0];
        await addIsSavedToTracks(album.tracks.items, accessToken);
    }
    res.status(200).send(album);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/artist/:artistId", async (req, res) => {
    try {
        let latest;
        const {artistId} = req.params;
        const accessToken = req.cookies.access_token;
        const responses = await Promise.all([
            spotifyApiCall(`/artists/${artistId}`),
            spotifyApiCall(`/artists/${artistId}/albums?include_groups=album&country=US&limit=50`),
            spotifyApiCall(`/artists/${artistId}/albums?include_groups=single&country=US&limit=50`),
            spotifyApiCall(`/artists/${artistId}/related-artists?limit=50`),
            spotifyApiCall(`/artists/${artistId}/albums?include_groups=appears_on&country=US&limit=50`),
            spotifyApiCall(`/artists/${artistId}/top-tracks?country=us`),
            axios(`https://open.spotify.com/artist/${artistId}`),
        ]);
        const artist = responses[0].data;
        const albums = responses[1].data;
        const singles = responses[2].data;
        const relatedArtists = {items: responses[3].data.artists};
        const appearsOn = responses[4].data;
        const topTracks = {items: responses[5].data.tracks};
        const playlists = await spotifyApiCall(`/search?type=playlist&limit=50&q=${artist.name}`);
        const $ = cheerio.load(responses[6].data);
        $("a").each((index, element) => {
            // get the link address
            const href = $(element).attr("href");
            // remove all links except for "/album" and "/artist"
            if (!href.startsWith("/album/") && !href.startsWith("/artist/")) {
                const html = $(element).html();
                // replace links with the links inner html text
                $(element).replaceWith(html);
            }
        });
        // get the bio paragraphs text
        let bio = $(".bio-primary span").html() + $(".bio-secondary span").first().html();
        // remove first paragraph of bio secondary because its exactly same as bio primary paragraph
        $(".bio-secondary").first().remove();
        // remove the outer span tag from each bio secondary paragraph
        $(".bio-secondary").each((index, element) => {
            bio = bio + '<p class="bio-secondary">' + $(element).children().first().html() + "</p>";
        });
        if (bio) {
            bio = '<p class="bio-primary">' + bio + "</p>";
        }
        artist.monthlyListeners = $(".insights__column__number").first().html();
        // spotify puts most recent item in first index
        latest = singles.items[0] || albums.items[0];
        if (albums.total > 0 && singles.total > 0) {
            // compare and get most recent release
            const albumReleaseDate = new Date(albums.items[0].release_date).getTime();
            const singleReleaseDate = new Date(singles.items[0].release_date).getTime();
            if (albumReleaseDate >= singleReleaseDate) {
                latest = albums.items[0];
            }
        }
        if (latest) {
            // get latest tracks
            const {data} = await spotifyApiCall(`/albums/${latest.id}`);
            latest.tracks = data.tracks;
        }
        /* TODO: implement recommendations later */
        // const recommendations = await spotifyApiCall(`${recommendationUrl}?seed_artists=${artistId}&seed_genres=${artist.genres[0]}`);
        if (accessToken) {
            const isSaved = await spotifyApiCall("/me/following/contains?type=artist&ids=" + artist.id, accessToken);
            artist.isSaved = isSaved.data[0];
            await addIsSavedToTracks(topTracks.items, accessToken);
        }
        res.status(200).send({artist, albums, singles, appearsOn, bio, latest, playlists: playlists.data.playlists, relatedArtists, topTracks});
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/browse", async (req, res) => {
    const {limit = 20, page = 1} = req.query;
    const offset = (page - 1) * limit;
    try {
        const {data} = await spotifyApiCall(`/browse/categories?offset=${offset}&limit=${limit}`);
        res.status(200).send(data);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/category/:categoryId", async (req, res) => {
    const {limit = 20, page = 1} = req.query;
    const offset = (page - 1) * limit;
    try {
        const responses = await Promise.all([
            spotifyApiCall(`/browse/categories/${req.params.categoryId}`),
            spotifyApiCall(`/browse/categories/${req.params.categoryId}/playlists?offset=${offset}&limit=${limit}`)
        ]);
        const {playlists} = responses[1].data; 
        playlists.name = responses[0].data.name;
        res.status(200).send(playlists);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/home", async (req, res) => {
    try {
        const genres = await spotifyApiCall("/recommendations/available-genre-seeds");
        const randomGenres = () => genres.data.genres.sort(() => 0.5 - Math.random()).slice(0,5);
        const responses = await Promise.all([
            spotifyApiCall("/browse/new-releases?limit=50"),
            spotifyApiCall("/playlists/4LZtDy62wDvQ4o8JB4UrcR"),
            spotifyApiCall(`/recommendations?seed_genres=${randomGenres().join()}`),
            spotifyApiCall(`/recommendations?seed_genres=${randomGenres().join()}`),
            spotifyApiCall("/search?type=playlist&market=us&locale=en&limit=50&q=top 50"),
            spotifyApiCall("/browse/featured-playlists"),
            spotifyApiCall("/search?q=%20:new&type=show&limit=16")
        ]);
        const latestAlbums = responses[0].data.albums.items.sort(() => 0.5 - Math.random()).slice(0,7);
        const newAlbums = responses[0].data.albums.items.splice(0, 16);
        const mostPopular = responses[1].data.tracks.items.splice(0, 16);
        const turnItUp = responses[2].data.tracks.map((track) => track.album).splice(0, 16);
        const bruceLeePicks = responses[3].data.tracks.map((track) => track.album).splice(0, 16);
        const top50 = responses[4].data.playlists.items.filter(item => item.name.includes("Top 50")).splice(0, 16);
        const featuredPlaylists = responses[5].data.playlists.items.splice(0, 16);
        const newShows = responses[6].data.shows.items;
        res.status(200).send({latestAlbums, newAlbums, mostPopular, turnItUp, bruceLeePicks, top50, featuredPlaylists, newShows});
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.post("/lyrics", async (req, res) => {
    try {
        const promises = req.body.tracks.map(async (track) => {
            const {data} = await axios({
                method: "get",
                url: encodeURI(`https://api.genius.com/search?q=${track.artists[0].name} ${track.name}`),
                headers: {"Authorization": `Bearer ${process.env.GENIUS_TOKEN}`},
                timeout: timeout
            });
            track.lyrics = null;
            if (data.response.hits.length > 0 && track.artists[0].name.toLowerCase() === data.response.hits[0].result.primary_artist.name.toLowerCase()) {
                const geniusLyricsPage = await axios(data.response.hits[0].result.url);
                const $ = cheerio.load(geniusLyricsPage.data);
                // remove hyperlinks
                $("a").each((index, element) => {
                    const html = $(element).html();
                    $(element).replaceWith(html);
                });
                track.lyrics = $("main > div:nth-child(2) > div:nth-child(3)").html();
            }
            return track;
        });
        const tracksWithLyrics = await Promise.all(promises);
        res.status(200).send(tracksWithLyrics);
    } catch(error) {
        res.status(200).send(req.body.tracks);
    }
});

router.get("/playlist/:playlistId", async (req, res) => {
    try {
        const accessToken = req.cookies.access_token;
        const playlist = await spotifyApiCall(`/playlists/${req.params.playlistId}`).then((response) => response.data);
        let {limit, next} = playlist.tracks;
        let offset = limit;
        playlist.tracks.items = playlist.tracks.items.map(item => item.track);
        while (next) {
            let tracks = await spotifyApiCall(`/playlists/${req.params.playlistId}/tracks?offset=${offset}&limit=${limit}`).then((response) => response.data);
            let items = tracks.items.map((item) => item.track);
            playlist.tracks.items = playlist.tracks.items.concat(items);
            offset = offset + limit;
            next = tracks.next;
        }
        if (accessToken) {
            // check if playlist belongs to user            
            const {data} = await spotifyApiCall(`/playlists/${req.params.playlistId}/followers/contains?ids=${req.cookies.id}`, req.cookies.access_token);
            playlist.isSaved = data[0];
            await addIsSavedToTracks(playlist.tracks.items, accessToken);
        }
         res.status(200).send(playlist);
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/playlists", async (req, res) => {
    try {
        const accessToken = req.cookies.access_token;
        if (accessToken) {
             const responses = await Promise.all([
                spotifyApiCall("/browse/featured-playlists", accessToken),
                spotifyApiCall("/me/playlists", accessToken)             
            ]);
            res.status(200).send({featuredPlaylists: responses[0].data.playlists, playlists: responses[1].data});
        } else {
            const {data} = await spotifyApiCall("/browse/featured-playlists");
            res.status(200).send({featuredPlaylists: data.playlists});
        }
    } catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/search", async (req,res) => {
    try {
        const accessToken = req.cookies.access_token;
        const {data} = await spotifyApiCall(`/search?type=album,artist,playlist,show,track&market=us&locale=en&limit=50&q=${req.query.q}`);
        const searchResults = {};
        for (let key in data) {
            if (data[key].total > 0) {
                searchResults[key] = data[key];
            }
        }
        if (accessToken && searchResults.tracks) {
            await addIsSavedToTracks(searchResults.tracks.items, accessToken);
        }
        res.status(200).send(searchResults);
    }
    catch(error) {
        res.status(error.status).send(error);
    }
});

router.get("/show/:showId", async (req, res) => {
    try {
        const show = await spotifyApiCall(`/shows/${req.params.showId}`).then((response => response.data));
        let {limit, next} = show.episodes;
        let offset = limit;
        while (next) {
            let episodes = await spotifyApiCall(`/shows/${req.params.showId}/episodes?offset=${offset}&limit=${limit}`).then((response) => response.data);
            show.episodes.items = show.episodes.items.concat(episodes.items);
            offset = offset + limit;
            next = episodes.next;
        }
        if (req.cookies.access_token) {
            const response = await spotifyApiCall(`/me/shows/contains?ids=${req.params.showId}`, req.cookies.access_token);
            show.isSaved = response.data[0];
        }
        res.status(200).send(show);
    }
    catch(error) {
        res.status(error.status).send(error);
    }
});

module.exports = router;