import React, { Component } from 'react';
import { NavLink, Link, withRouter} from 'react-router-dom';
import '../../styles/header.scss';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const accessToken = cookies.get("access_token");

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expandNav: false,
            isLoggedIn: false,
            displayName: cookies.get("display_name"),
            imageUrl: null,
            searchInput: ""
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.setState({imageUrl: cookies.get("image_url")});
    }

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     // check if the search query has changed and update the results
    //     console.log(prevProps);
    //     console.log(prevState);
    //     // console.log(snapshot);
    // }

    handleClick() {
        this.setState({expandNav :!this.state.expandNav});
    }

    handleChange = (e) => {
        this.setState({searchInput: e.target.value});
    }

    handleSubmit = (e) => {
        const { searchInput } = this.state;
        e.preventDefault();
        if(searchInput) {
            this.props.history.push(`/search?q=` + this.state.searchInput);        
        }
    }

    render() {
        // return <p>header</p>
        const { expandNav } = this.state;
        return (
            <header>
                <div id="nav-header">
                    {/* <img src="/images/bruce-logo1.png" alt="bruce lee logo" height="40"/> */}
                    {/* <NavLink className="navbar-brand" to="/">Enter the Dj</NavLink> */}
                    <div className="nav-menu-wrapper">
                        {/* <span>{this.state.displayName}</span> */}
                        
                        <button className="nav-button" onClick={this.handleClick}>
                            <span className={expandNav ? "top navbar-bar active" : "top navbar-bar"}></span>
                            <span className={expandNav ? "middle navbar-bar active" : "middle navbar-bar"}></span>
                            <span className={expandNav ? "bottom navbar-bar active" : "bottom navbar-bar"}></span>
                        </button>
                    </div>
                    <NavLink className="navbar-brand" to="/">Enter the Dj</NavLink>
                    <div className="d-none">
                        <img src="/images/bruce-logo2.png" alt="Bruce Lee face" height="30"/>
                    </div>
                    <form id="search-bar" onSubmit={this.handleSubmit}>
                        <div className="input-group input-group-sm">
                            <input 
                                className="form-control" 
                                type="search"
                                value={this.state.searchInput}
                                onChange={this.handleChange}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-dark"><i className="fas fa-search"></i></button>
                            </div>
                        </div>
                    </form>
                    {this.state.imageUrl && <Link id="user-profile" to="/profile"><img src={this.state.imageUrl} style={{height: "30px", verticalAlign:"unset"}}/></Link>}
                </div>
                <nav className={expandNav ? "nav-sidebar active" : "nav-sidebar"}>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" onClick={this.handleClick}><i className="fas fa-home"></i> HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/browse" onClick={this.handleClick}><i className="far fa-eye"></i> BROWSE</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/top" onClick={this.handleClick}><i className="fas fa-tasks"></i> TOP</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/favorites" onClick={this.handleClick}><i className="fas fa-heart"></i> FAVORITES</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/playlists" onClick={this.handleClick}><i className="fas fa-music"></i> PLAYLIST</NavLink>
                        </li>   
                        {/* <li className="nav-item">
                            <NavLink className="nav-link" to="/search" onClick={this.handleClick}><i className="fas fa-search"></i> SEARCH</NavLink>
                        </li>    */}
                        {
                            accessToken ?
                            <li className="nav-item">
                                <a className="nav-link" href="/logout"><i className="fas fa-sign-out-alt"></i> LOG OUT</a>
                            </li> 
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/login" onClick={this.handleClick}><i className="fas fa-sign-in-alt"></i> LOG IN</NavLink>
                            </li>          
                        }  
                    </ul>
                </nav>
                <div className={expandNav ? "overlay active" : "overlay"}>
                    {/* dark transparent overlay for underneath nav */}
                </div>
            </header>
        );
    }
}

export default withRouter(Header);