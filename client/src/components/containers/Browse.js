import { connect } from 'react-redux';
import Browse from '../presentational/Browse';
import {getBrowseRequest} from '../../redux/actions/browse';

const mapStateToProps = (state) => state.browse;

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getBrowseRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(Browse);