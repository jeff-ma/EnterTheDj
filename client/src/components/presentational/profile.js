import React from 'react';
// import { PropTypes } from 'prop-types';
import Login from './Login';
import '../../styles/profile.scss';
import defaultProfile from "../../images/default-profile.jpg";

const Profile = (props) => {
    if (props.cookies && props.cookies.display_name) {    
        const birthdate = props.cookies.birthdate.split("-");
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        const year = birthdate[0];
        const month = months[parseInt(props.cookies.birthdate.split("-")[1]) - 1];
        const day = birthdate[2];
        const imageUrl = props.cookies.image_url || defaultProfile;
        return (
            <div id="main-wrapper" className="container">
            <h2 className="section-title">Spotify Profile</h2>
                <div id="profile-section">
                    <div>
                        <img id="profile-image" src={imageUrl} alt="profile"/>
                        <h3 id="spotify-display-name">{props.cookies.display_name}</h3>
                    </div>
                    <div>
                        <section className="profile-section">
                        <h3 className="profile-header">Your Subscription</h3>
                        <hr/>
                        <p>Your are a {props.cookies.product} Spotify user.</p>
                        </section>
                        <section className="profile-section">
                        <h3>Spotify Details</h3>
                        <hr/>
                        <p>Wow! You have {props.cookies.followers} followers.</p>
                        <p>Your Spotify user id <br/> {props.cookies.id}</p>
                        <p>Your Spotify Link <br/> <a href={props.cookies.spotify_url} target="_blank" rel="noopener noreferrer">{props.cookies.spotify_url}</a></p>
                        </section>
                        <section className="profile-section">
                        <h3>Personal Info</h3>
                        <hr/>
                        <p>{props.cookies.email} is your Spotify registered email address.</p>                        
                        <p>You listen to Spotify somewhere in {props.cookies.country}.</p>
                        <p>{month} {day} {year} is your birthdate.</p>                        
                        </section>
                    </div>
                </div>
            </div>
        );  
    } else {
        return <Login><p>Please log in to view your profile.</p></Login>;
    }
}

export default Profile;