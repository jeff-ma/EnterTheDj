import { connect } from 'react-redux';
import { getHomeAlbumsRequest } from '../../redux/actions/home';
import Home from '../presentational/Home';

const mapStateToProps = (state) => {
    return state.home;
};

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getHomeAlbumsRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);