import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {updatePlayer} from "../../redux/actions/player";
import {formatDate, formatDuration} from "../../utils";
import ipod from "../../images/ipod.svg";
import info from "../../images/info.svg";

const EpisodesList = ({episodes, updatePlayer}) => (
    <ul className="episodes-list-container">
        {episodes.items.map((item, index) => (
            <li key={index} className="show-list-item">
                <div>
                    <img className="icon" src={ipod} alt="player" onClick={() => updatePlayer(item.id, "episode")}/>
                </div>
                <div className="episode-details">
                    <p>{item.name}</p>
                    <p>{formatDate(item.release_date)}</p>
                </div>
                <div>{formatDuration(item.duration_ms)}</div>
                <div className="dropdown dropleft float-right">
                    <img className="icon dropdown-toggle" src={info} alt="like" data-toggle="dropdown"/>
                    <div className="dropdown-menu">
                        <div className="dropdown-item-text">
                            <p className="text-white">{item.name}</p>
                            <p>{formatDate(item.release_date)}</p>
                            <p>{formatDuration(item.duration_ms)}</p>
                        </div>
                        <hr/>
                        <div className="episode-description dropdown-item-text">
                            <p>{item.description}</p>
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