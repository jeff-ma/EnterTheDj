import React from 'react';
import { PropTypes } from 'prop-types';
import '../../styles/player.scss';

const Player = (props) => {
    if (props.audioId && props.audioType) {
        return (
            <div id="player-container">
                <iframe id="player" title="player" src={`https://open.spotify.com/embed/${props.audioType}/${props.audioId}`} allowtransparency="false" allow="encrypted-media"></iframe>;
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

export default Player;