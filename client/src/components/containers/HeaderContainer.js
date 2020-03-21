import React from "react";
import { connect } from "react-redux";
import { toggleNav } from "../../redux/actions/sideNav";
import Header from "../presentational/Header";

const HeaderContainer = (props) => (<Header {...props}/>);

const mapStateToProps = (state) => state.sideNav;

const mapDispatchToProps = (dispatch) => ({
    toggleNav: () => dispatch(toggleNav())
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);