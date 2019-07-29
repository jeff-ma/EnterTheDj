import { connect } from 'react-redux';
import Category from '../presentational/Category';
import {getCategoryRequest} from '../../redux/actions/category';

const mapStateToProps = (state) => state.category;

const mapDispatchToProps = (dispatch) => ({
    onload: (categoryId) => dispatch(getCategoryRequest(categoryId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Category);