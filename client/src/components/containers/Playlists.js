import { connect } from 'react-redux';
import Playlists from '../presentational/Playlists';
import { getPlaylistsRequest} from '../../redux/actions/playlists';

const mapStateToProps = (state) => state.playlists;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getPlaylistsRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);