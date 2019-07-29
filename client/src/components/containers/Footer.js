import { connect } from 'react-redux';
import Footer from '../presentational/Footer';

const mapStateToProps = (state) => state.footer;

const mapDispatchToProps = (dispatch) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);