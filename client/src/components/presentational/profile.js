import React from "react";
import {Cookies} from "react-cookie";
import Login from "./Login";
import {formatDate} from "../../utils";
import defaultProfile from "../../images/default-profile.jpg";

const Profile = (props) => {
    const cookies = new Cookies();
    const displayName = cookies.get("display_name");
    if (displayName) {   
        const birthdate = cookies.get("birthdate");
        const imageUrl = cookies.get("image_url") || defaultProfile;
        return (
            <div className="container">
                <h2 className="section-title">Spotify Profile</h2>
                <div className="profile-section">
                    <div>
                        <img className="profile-image" src={imageUrl} alt="profile"/>
                        <h3 className="profile-name">{displayName}</h3>
                    </div>
                    <div>
                        <section>
                            <h3>Your Subscription</h3>
                            <hr/>
                            <p>Your are a {cookies.get("product")} Spotify user.</p>
                        </section>
                        <section>
                            <h3>Spotify Details</h3>
                            <hr/>
                            <p>Wow! You have {cookies.get("followers")} followers.</p>
                            <p>Your Spotify user id <br/> {cookies.get("id")}</p>
                            <p>Your Spotify Link <br/> <a href={cookies.get("spotify_url")} target="_blank" rel="noopener noreferrer">{cookies.get("spotify_url")}</a></p>
                        </section>
                        <section>
                            <h3>Personal Info</h3>
                            <hr/>
                            <p>{cookies.get("email")} is your Spotify registered email address.</p>                        
                            <p>You listen to Spotify somewhere in {cookies.get("country")}.</p>
                            <p>{formatDate(birthdate)} is your birthdate.</p>                        
                        </section>
                    </div>
                </div>
            </div>
        );  
    } else {
        return (<Login><p>Please log in to view your profile.</p></Login>);
    }
}

export default Profile;