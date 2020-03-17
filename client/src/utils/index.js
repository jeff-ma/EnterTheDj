import axios from 'axios';
import {Cookies} from 'react-cookie';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");
const userId = cookies.get("id");
const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json',
};

/* 
Get an Album
 */
export const getAlbum = async (albumId) => {
  const {data} = await axios.get(`/api/album/${albumId}`);
  return data;
};


/* 
Get an Artist
 */
export const getArtist = async (artistId) => {
  const {data} = await axios.get(`/api/artist/${artistId}`);
  return data;
};

/* 
Browse a List of Categories
 */
export const getBrowse = async () => {
  const {data} = await axios.get("/api/browse");
  return data;
};

/* 
Get a Category
 */
export const getCategory = async (categoryId) => {
  const {data} = await axios.get(`/api/categoryId/${categoryId}`);
  return data;
};

/* 
Follow Artists or Users
https://developer.spotify.com/documentation/web-api/reference/follow/follow-artists-users/
 */
export const saveArtist = (artistId) => {
  if (accessToken) {
    return axios({
      method: "put",
      url: encodeURI(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Follow a Playlist
https://developer.spotify.com/documentation/web-api/reference/follow/follow-playlist/
 */
export const savePlaylist = async (playlistId) => {
  if (accessToken) {
    return axios({
      method: "put",
      url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/followers`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Get User's Followed Artists
https://developer.spotify.com/documentation/web-api/reference/follow/get-followed/
 */
export const getSavedArtists = async () => {
  const {data} = await axios.get("https://api.spotify.com/v1/me/following?type=artist", {headers});
  return data;
};

/* 
Unfollow Artists or Users
https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-artists-users/
 */
export const removeArtist = (artistId) => {
  // const {data} = await axios.delete(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`, {headers});
  // return data;
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/me/following?type=artist&ids=${artistId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Unfollow a Playlist
https://developer.spotify.com/documentation/web-api/reference/follow/unfollow-playlist/
 */
export const removePlaylist = async (playlistId) => {
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/followers`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Get Home page albums/podcasts
 */
export const getHome = async () => {
  const {data} = await axios.get("/api/home");
  return data;
};

/* 
Get Current User's Saved Albums
https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-albums/
 */
export const getSavedAlbums = async () => {
  if (accessToken) {
    const {data} = await axios.get("https://api.spotify.com/v1/me/albums", {headers});
    return data;
  } else {
    return null;
  }
};

/* 
Get a User's Saved Tracks
https://developer.spotify.com/documentation/web-api/reference/library/get-users-saved-tracks/
 */
export const getSavedTracks = async () => {
  if (accessToken) {
    const {data} = await axios.get("https://api.spotify.com/v1/me/tracks", {headers});
    return data;
  } else {
    return null;
  }
};

/* 
Remove Albums for Current User
https://developer.spotify.com/documentation/web-api/reference/library/remove-albums-user/
 */
export const removeAlbum = (albumId) => {
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/me/albums?ids=${albumId}`),
      headers
    });
  } else {
    return null;
  }
}
/* 
Remove User's Saved Tracks
https://developer.spotify.com/documentation/web-api/reference/library/remove-tracks-user/
 */
export const removeTrack = (trackId) => {
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`),
      headers
    });
  } else {
    return null;
  }
}

/* 
Save Albums for Current User
https://developer.spotify.com/documentation/web-api/reference/library/save-albums-user/
 */
export const saveAlbum = (albumId) => {
  if (accessToken) {
    return axios({
      method: "put",
      url: encodeURI(`https://api.spotify.com/v1/me/albums?ids=${albumId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Save Tracks for User
https://developer.spotify.com/documentation/web-api/reference/library/save-tracks-user/
 */
export const saveTrack = (trackId) => {
  if (accessToken) {
    return axios({
      method: "put",
      url: encodeURI(`https://api.spotify.com/v1/me/tracks?ids=${trackId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
Get a User's Top Artists and Tracks
https://developer.spotify.com/documentation/web-api/reference/personalization/get-users-top-artists-and-tracks/
 */
export const getTop = async () => {
  if (accessToken) {
    const [artists, tracks] = await axios.all([
      axios.get("https://api.spotify.com/v1/me/top/artists?limit=50", {headers}),
      axios.get("https://api.spotify.com/v1/me/top/tracks?limit=50", {headers})
    ]);
    await addIsSavedToTracks(tracks.data.items);
    return {artists: artists.data, tracks: tracks.data};
  } else {
    return null;
  }
};
/* 
Get Current User's Recently Played Tracks
https://developer.spotify.com/documentation/web-api/reference/player/get-recently-played/
 */
export const getRecent = async () => {
  const {data} = await axios.get("https://api.spotify.com/v1/me/player/recently-played?limit=50", {headers});
  const tracks = data.items.map((item) => item.track);
  await addIsSavedToTracks(tracks);
  data.items = tracks;
  return data;
};

/* 
Add Tracks to a Playlist 
https://developer.spotify.com/documentation/web-api/reference/playlists/add-tracks-to-playlist/
 */
// export const addTrackToPlaylist = (playlistId, trackUri) => {
//   if (accessToken) {
//     // return axios({method: "post", url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`}, headers);
//     return axios({
//       method: "post",
//       url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
//       headers
//     });
//   } else {
//     return null;
//   }
// };

export const playlistAddTrack = async (playlistId, trackUri) => {
  if (accessToken) {
    // return axios({method: "post", url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`}, headers);
    // only add track if not in playlist
    const {data} = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {headers});
      if (!data.tracks.items.some((item) => item.track.uri === trackUri)) {
        return axios({
            method: "post",
            url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
            headers
        });
        // yield put(addAlert("Track added to playlist"));
    }
    return null;
  } else {
    return null;
  }
};

/* 
Create a Playlist
https://developer.spotify.com/documentation/web-api/reference/playlists/create-playlist/
 */
export const createPlaylist = (name, description) => {
  if (accessToken) {
    return axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {name, description}, {headers}).then((response) => response.data);
  } else {
    return null;
  }
};

/* 
Get a List of Current User's Playlists
https://developer.spotify.com/documentation/web-api/reference/playlists/get-playlist/
 */
export const getSavedPlaylists = () => {
  if (accessToken) {
    return axios.get(`https://api.spotify.com/v1/me/playlists`, { headers }).then(response => response.data);
  } else {
    return null;
  }
};

/* 
Get a Playlist
 */
export const getPlaylist = (playlistId) => {
  return axios.get(`/api/playlist/${playlistId}`).then((response) => response.data);
};

/* 
Remove Tracks from a Playlist
https://developer.spotify.com/documentation/web-api/reference/playlists/remove-tracks-playlist/
 */
export const playlistRemoveTrack = (playlistId, trackUri) => {
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`),
      headers,
      data: {
        tracks: [{uri: trackUri}]
      }
    });
    // return axios.delete(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${trackUri}`, {headers, data: {tracks: [{uri: trackUri}]}}).then(response => response.data);
  } else {
    return null;
  }
};

/* 
Upload a Custom Playlist Cover Image
https://developer.spotify.com/documentation/web-api/reference/playlists/upload-custom-playlist-cover/
 */
export const uploadPlaylistImage = (playlistId, image) => {
  if(accessToken) {
    return axios.put(`https://api.spotify.com/v1/playlists/${playlistId}/images`, image, {headers: {  'Authorization': `Bearer ${accessToken}`, 'Content-Type': 'image/jpeg'}});
  } else {
    return null;
  }
};

/* 
save show
undocumented spotify api endpoint
 */
export const saveShow = (showId) => {
  if (accessToken) {
    return axios({
      method: "put",
      url: encodeURI(`https://api.spotify.com/v1/me/shows?ids=${showId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
remove show
undocumented spotify api endpoint
 */
export const removeShow = (showId) => {
  if (accessToken) {
    return axios({
      method: "delete",
      url: encodeURI(`https://api.spotify.com/v1/me/shows?ids=${showId}`),
      headers
    });
  } else {
    return null;
  }
};

/* 
get saved shows
undocumented spotify api endpoint
 */
export const getSavedShows = async () => {
  if (accessToken) {
    const {data} = await axios.get("https://api.spotify.com/v1/me/shows?limit=50", {headers});
    data.items = data.items.map((item) => item.show);
    return data;
  } else {
    return null;
  }
};

export const addIsSavedToTracks = async (tracks) => {
  // spotify only allows checking up to 50 track ids at one time
  let total = 0;
  let savedTracksCheck = [];
  while (total < tracks.length) {
      const trackIds = tracks.slice(total, total + 50).map((track) => track.id);
      const {data} = await axios.get("https://api.spotify.com/v1/me/tracks/contains?ids=" + trackIds.join(","), {headers})
      // const response = await spotifyApiCall(checkUserSavedTracksUrl + trackIds.join(","), accessToken);
      savedTracksCheck = savedTracksCheck.concat(data);
      total = total + 50;
  }
  tracks.forEach((track, index) => {
      track.isSaved = savedTracksCheck[index];
  });
};

// export const getTracksExtras = async (tracks) => {
// // set each track to loading
//   tracks.forEach((track, index) => {
//       track.lyrics = "loading";
//       track.audioAnalysis = "loading"; 
//       track.audioFeatures = "loading";
//   });
//   yield updateTracks(tracks);
//   // console.log("getting track extras...");
//   const lyrics = yield axios.post('/api/lyrics', {tracks});
//   tracks.forEach((track, index) => {
//       track.lyrics = lyrics.data[index].lyrics;
//   });
//   // console.log("update traks for lyrics");
//   yield updateTracks(tracks);
//   console.log("done lyrcis ");        
//   const audioData = yield axios.post('/api/audio_data', {tracks});
//   tracks.forEach((track, index) => {
//       track.audioAnalysis = audioData.data[index].audioAnalysis;
//       track.audioFeatures = audioData.data[index].audioFeatures; 
//   });
//   yield updateTracks(tracks);
//   // console.log("done audio data ");
// };

// export const token = getAccessToken();


// Get the query params off the window's URL
export const getHashParams = () => {
  const hashParams = {};
  let e;
  const r = /([^&;=]+)=?([^&;]*)/g;
  const q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
};

// Format milliseconds into MM:SS
export const formatDuration = ms => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

// Format milliseconds into X minutes and Y seconds
export const formatDurationForHumans = millis => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes} Mins ${seconds} Secs`;
};

// Get year from YYYY-MM-DD
export const getYear = date => date.split('-')[0];

// Transform Pitch Class Notation to string
export const parsePitchClass = note => {
  let key = note;

  switch (note) {
    case 0:
      key = 'C';
      break;
    case 1:
      key = 'D♭';
      break;
    case 2:
      key = 'D';
      break;
    case 3:
      key = 'E♭';
      break;
    case 4:
      key = 'E';
      break;
    case 5:
      key = 'F';
      break;
    case 6:
      key = 'G♭';
      break;
    case 7:
      key = 'G';
      break;
    case 8:
      key = 'A♭';
      break;
    case 9:
      key = 'A';
      break;
    case 10:
      key = 'B♭';
      break;
    case 11:
      key = 'B';
      break;
    default:
      return null;
  }

  return key;
};

export const commafyNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const randomQuote = () => {
  const quotes = [
    "Knowing is not enough, we must apply. Willing is not enough, we must do.",
    "Showing off is the fool's idea of glory.",
    "I fear not the man who has practiced 10,000 kicks once, but I fear the man who has practiced one kick 10,000 times.",
    "Adapt what is useful, reject what is useless, and add what is specifically your own.",
    "If you spend too much time thinking about a thing, you'll never get it done.",
    "Having no limitation as limitation.",
    "If you love life, don't waste time, for time is what life is made up of.",
    "Mistakes are always forgivable, if one has the courage to admit them.",
    "It is not a daily increase, but a daily decrease. Hack away at the inessentials.",
    "Knowledge will give you power, but character respect.",
    "I’m not in this world to live up to your expectations and you’re not in this world to live up to mine.",
    "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    "A wise man can learn more from a foolish question than a fool can learn from a wise answer.",
    "Absorb what is useful, discard what is useless and add what is specifically your own.",
    "To hell with circumstances; I create opportunities.",
    "Real living is living for others.",
    "The more we value things, the less we value ourselves.",
    "If you love life, don’t waste time, for time is what life is made up of.",
    "Life’s battles don’t always go to the stronger or faster man. But sooner or later the man who wins, is the man who thinks he can.",
    "‎The successful warrior is the average man, with laser-like focus.",
    "In the middle of chaos lies opportunity.",
    "For it is easy to criticize and break down the spirit of others, but to know yourself takes a lifetime.",
    "Be happy, but never satisfied.",
    "Always be yourself, express yourself, have faith in yourself, do not go out and look for a successful personality and duplicate it.",
    "The key to immortality is first living a life worth remembering.",
    "A wise man can learn more from a foolish question than a fool can learn from a wise answer.",
    "I respect faith, but doubt is what gets you an education.",
    "The poorer we are inwardly, the more we try to enrich ourselves outwardly.",
    "This achieving the center, being grounded in one’s self, is about the highest state a human being can achieve.",
    "What is defeat? Nothing but education; nothing but the first step to something better.",
    "Your mind is the result of a thousand yesterdays.",
    "Life is wise, limitless. There is no border, no frontier.",
    "Life is your teacher, and you are in a state of constant learning.",
    "The best techniques are the simple ones executes right.",
    "Yesterday’s dreams are often tomorrow’s realities.",
    "Do not pray for an easy life, pray for the strength to endure a difficult one.",
    "The more we understand, the greater and deeper will be our contact with all that is around us.",
    "Only the self-sufficient stand alone – most people follow the crowd and imitate.",
    "There is no weapon more deadly than the will.",
    "Long-term consistency trumps short-term intensity.",
    "A goal is not always meant to be reached. It often serves simply as something to aim at.",
    "Keep your mind on the things you want and off those you don’t.",
    "Research your own experience; absorb what is useful, reject what is useless and add what is essentially your own.",
    "Empty your mind, be formless, shapeless, like water. If you put water into a cup, it becomes the cup. You put water into a bottle and it becomes the bottle. You put it in a teapot, it becomes the teapot. Water can flow or it can crash. Be water, my friend.",
    "Simplicity is the last step of art and the beginning of nature.",
    "Remember my friend that it is not what happens that counts, it is how you react to them.",
    "Your mental attitude determines what you make of it, either a stepping stone or stumbling block.",
    "You cannot hurt that which is formless. The softest thing cannot be snapped and emptiness cannot be confined.",
    "That of not being tense but ready, not thinking but not dreaming, not being rigidly set but flexible. Aware and alert, ready for whatever may come.",
    "Remember, success is a journey, not a destination. Have faith in your ability. You will do just fine.",
    "What you habitually think largely determines what you will ultimately become.",
    "No one can hurt you unless you allow him to.",
    "Empty yourself! Open up! After all, the usefulness of a cup is in its emptiness.",
    "Defeat is a state of mind; no one is ever defeated until defeat has been accepted as a reality.",
    "Be a calm beholder of what is happening around you.",
    "Don’t strive to become, but be."
  ];
  return quotes[Math.floor(Math.random()* quotes.length)];
};