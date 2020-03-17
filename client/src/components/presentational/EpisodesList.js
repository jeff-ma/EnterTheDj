import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {updatePlayer} from "../../redux/actions/player";
import {formatDuration} from "../../utils";
import ipod from "../../images/ipod.svg";
import infoIcon from "../../images/info-icon.svg";
import "../../styles/episodeList.scss";

const EpisodesList = ({episodes, updatePlayer}) => (
    <ul className="list-container">
        {episodes.items.map((item, index) => (
            <li key={index} className="album-list-item">
                <div className="player-icon-box">
                    <img src={ipod} height="20" alt="player" onClick={() => updatePlayer(item.id, "episode")}/>
                </div>
                <div className="episode-details" onClick={() => updatePlayer(item.id, "episode")}>
                    <div className="tile-track">{item.name}</div>
                    <div className="track-artist">{item.release_date}</div>
                </div>
                <div className="track-duration">{formatDuration(item.duration_ms)}</div>
                <div className="dropdown dropleft float-right">
                    <img className="option-icon dropdown-toggle" src={infoIcon} alt="like" data-toggle="dropdown"/>
                    <div className="dropdown-menu">
                        <div className="dropdown-item-text">
                            <p>{item.name}</p>
                            <p>{item.release_date}</p>
                            <p>{formatDuration(item.duration_ms)}</p>
                        </div>
                        <hr/>
                        <div className="episode-description dropdown-item-text">
                            {item.description}                                        
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
);

EpisodesList.propTypes = {
    episodes: PropTypes.object.isRequired,
    updatePlayer: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))});

export default connect(null, mapDispatchToProps)(EpisodesList);