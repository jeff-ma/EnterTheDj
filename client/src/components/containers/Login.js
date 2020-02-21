import { connect } from 'react-redux';
import Login from '../presentational/Login';
// import { login, logout } from '../../redux/actions/login';

const mapStateToProps = (state) => {
    return state.login
};

const mapDispatchToProps = (dispatch) => ({
    // login: () => dispatch(login()),
    // logout: () => dispatch(logout())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);