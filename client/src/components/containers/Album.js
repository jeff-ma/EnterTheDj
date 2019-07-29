import { connect } from 'react-redux';
import { getAlbumRequest, getLyricsRequest } from '../../redux/actions/album';
import { updateAudio } from '../../redux/actions/footer';
import Album from '../presentational/Album';

const mapStateToProps = (state) => {
    return state.album;
};

const mapDispatchToProps = (dispatch) => ({
    onload: (albumId) => dispatch(getAlbumRequest(albumId)),
    updateAudio: (audioId, audioType) => dispatch(updateAudio(audioId, audioType)),
    getLyrics: (tracks) => dispatch(getLyricsRequest(tracks))
    // getLyrics: (artist, track) => dispatch(getLyricsRequest(artist, track))
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);