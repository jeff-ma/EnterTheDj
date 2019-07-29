import { connect } from 'react-redux';
import { getFavoritesRequest } from '../../redux/actions/favorites';
import Favorites from '../presentational/Favorites';

const mapStateToProps = (state) => state.favorites;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getFavoritesRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);