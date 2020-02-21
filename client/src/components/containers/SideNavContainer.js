import React from 'react';
import { connect } from 'react-redux';
import { closeNav } from '../../redux/actions/sideNav';
import SideNav from '../presentational/SideNav';

const SideNavContainer = (props) => <SideNav {...props}/>;

const mapStateToProps = (state) => state.sideNav;

const mapDispatchToProps = (dispatch) => ({
    closeNav: () => dispatch(closeNav())
});

export default connect(mapStateToProps, mapDispatchToProps)(SideNavContainer);