import React from "react";
import {connect} from "react-redux";
import {PropTypes} from "prop-types";
import {updatePlayer} from "../../redux/actions/player";
import "../../styles/player.scss";

const Player = ({audioId, audioType}) => {
    if (audioId && audioType) {
        return (
            <div id="player-container">
                <iframe id="player" title="player" src={`https://open.spotify.com/embed/${audioType}/${audioId}`} allowtransparency="false" allow="encrypted-media"></iframe>
            </div>
        );
    } else {
        return null;
    }
};

Player.propTypes = {
    audioId: PropTypes.string,
    audioType: PropTypes.string
}

const mapStateToProps = (state) => state.player;

const mapDispatchToProps = (dispatch) => ({
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Player);