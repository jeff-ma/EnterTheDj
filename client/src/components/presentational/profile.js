import React, { Component} from 'react';
import { PropTypes } from 'prop-types';
import Cookies from 'universal-cookie';
// import '../../styles/profile.scss';

class Profile extends Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();

        this.state = {
            birthdate: cookies.get("birthdate"),
            country: cookies.get("country"),
            email: cookies.get("email"),
            spotifyUrl: cookies.get("spotify_url"),
            followers: cookies.get("followers"),
            displayName: cookies.get("display_name"),
            id: cookies.get("id"),
            imageUrl: cookies.get("image_url"),
            product: cookies.get("product")
        };
    }

    render() {
        return (
        <React.Fragment>
            <div className="container">
            <h2>Profile</h2>
                <div className="row">
                    <div className="col-md-6"><img src={this.state.imageUrl} alt="profile"/></div>
                    <div className="col-md-6">
                        <div>{this.state.displayName}</div>
                        <div>Birthdate: {this.state.birthdate}</div>
                        <div>Location: {this.state.country}</div>
                        <div>Email: {this.state.email}</div>
                        <div>Followers: {this.state.followers}</div>
                        <div>Spotify Id: {this.state.id}</div>
                        <div>Spotify Url: <a href={this.state.spotifyUrl} target="_blank">{this.state.spotifyUrl}</a></div>
                        <div>Spotify User Type: {this.state.product}</div>
                    </div>
                </div>
            </div>
        </React.Fragment>
        );  
    }
}
// Profile.propTypes = {

// };

export default Profile;