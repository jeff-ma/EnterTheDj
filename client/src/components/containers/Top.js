import { connect } from 'react-redux';
import { getTopRequest} from '../../redux/actions/top';
import Top from '../presentational/Top';

const mapStateToProps = (state) => state.top;

const mapDispatchToProps = (dispatch) => ({
    onload: (accessToken) => dispatch(getTopRequest(accessToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Top);