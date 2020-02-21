import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getHomeAlbumsRequest } from '../../redux/actions/home';
import { addAlert } from '../../redux/actions/alert';
import Home from '../presentational/Home';

class HomeContainer extends Component {
    componentDidMount() {
        this.props.onload();
    }   

    render() {
        return <Home {...this.props}/>;
    }
}

const mapStateToProps = (state) => state.home;

const mapDispatchToProps = (dispatch) => ({
    onload: () => dispatch(getHomeAlbumsRequest()),
    addAlert: (message) => dispatch(addAlert(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);