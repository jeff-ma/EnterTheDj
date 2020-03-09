import React from 'react';
import {connect} from 'react-redux';
import { updatePlayer } from '../../redux/actions/player';
import {formatDuration} from '../../utils';
import ipod3 from '../../images/ipod3.svg';
import heartIcon from '../../images/heart_outline2.svg';
import infoIcon from '../../images/info-icon.svg';
import "../../styles/episodeList.scss";
// import PropTypes from 'prop-types';

const EpisodesList = (props) => {
    const {updatePlayer} = props;
    return (
        <ul className="list-container">
            {props.episodes.items.map((item, index) => {
                return(
                    <li key={index} className="album-list-item">
                        <div className="player-icon-box">
                            <img src={ipod3} height="20" alt="player" onClick={() => updatePlayer(item.id, "episode")}/>
                        </div>
                        <div className="episode-details" onClick={() => updatePlayer(item.id, "episode")}>
                                <div className="tile-track">{item.name}</div>
                                <div className="track-artist">{item.release_date}</div>
                        </div>
                        <div className="track-duration">{formatDuration(item.duration_ms)}</div>
                        {/* <div className="option-box">
                            <img className="option-icon" src={infoIcon} alt="like"/>
                        </div> */}
                        <div className="dropdown dropleft float-right">
                            <img className="option-icon dropdown-toggle" src={infoIcon} alt="like" data-toggle="dropdown"/>
                            <div className="dropdown-menu">
                                <div className="dropdown-item-text">
                                        <p>{item.name}</p>
                                        <p>{item.release_date}</p>
                                        <p>{formatDuration(item.duration_ms)}</p>
                                </div>
                                {/* <div className="dropdown-divider"></div> */}
                                <hr/>
                                <div className="episode-description dropdown-item-text">
                                    {item.description}                                        
                                </div>
                            </div>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

const mapDispatchToProps = (dispatch) => ({updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))});

export default connect(null, mapDispatchToProps)(EpisodesList);