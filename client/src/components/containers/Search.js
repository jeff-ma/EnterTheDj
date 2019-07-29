import { connect } from 'react-redux';
import { getSearchRequest } from '../../redux/actions/search';
import Search from '../presentational/Search';

const mapStateToProps = (state) => ({
    ...state.search
});

const mapDispatchToProps = (dispatch) => ({
    // search: (query) => dispatch(getSearchRequest(query))
    search: (query) => dispatch(getSearchRequest(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);