import { connect } from 'react-redux';
import { getArtistRequest } from '../../redux/actions/artist';
import Artist from '../presentational/Artist';

const mapStateToProps = (state) =>  state.artist;

const mapDispatchToProps = (dispatch) => ({
    onload: (artistId) => dispatch(getArtistRequest(artistId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);