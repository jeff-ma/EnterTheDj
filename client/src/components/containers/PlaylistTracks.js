import { connect } from 'react-redux';
import { getPlaylistTracksRequest, getPlaylistLyricsRequest} from '../../redux/actions/playlistTracks';
import { updateAudio } from '../../redux/actions/footer';
import PlaylistTracks from '../presentational/PlaylistTracks';

const mapStateToProps = (state) => state.playlistTracks;

const mapDispatchToProps = (dispatch) => ({
    onload: (playlistId) => dispatch(getPlaylistTracksRequest(playlistId)),
    updateAudio: (audioId, audioType) => dispatch(updateAudio(audioId, audioType)),
    getLyrics: (tracks) => dispatch(getPlaylistLyricsRequest(tracks))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistTracks);