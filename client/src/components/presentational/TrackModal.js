import React from "react";
import Chart from "chart.js";
import {withCookies} from "react-cookie";
import PropTypes from "prop-types";
import {formatDuration, parsePitchClass} from "../../utils";
import PlaylistDropdown from "./PlaylistDropdown";
import "../../styles/trackModal.scss";
import heartOutline from "../../images/heart-outline.svg";
import heartSolid from "../../images/heart-solid.svg";

const TrackModal = ({track, playlists, removeTrack, saveTrack, allCookies}) => {
    const accessToken = allCookies.access_token;
    let data;
    let audioAnalysis = (<div><p>No audio data found</p></div>); 
    let lyrics = (<div>Lyrics not available</div>);
    const heartIcon = track.isSaved ? heartSolid : heartOutline;
    const updateTrack = track.isSaved ? removeTrack : saveTrack;
    const labels = [
        "acousticness",
        "danceability",
        "energy",
        "instrumentalness",
        "liveness",
        "speechiness",
        "valence",
    ];
    const ctx = document.getElementById("chart");
    if (track.audioFeatures && track.audioFeatures !== "loading") {
        data = labels.map((label) => track.audioFeatures[label]);
    }
    if (ctx) {
        new Chart(ctx, {
            type: "horizontalBar",
            data: {
                labels: labels,
                datasets: [{
                    label: "",
                    data: data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                        "rgba(123, 132, 135, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                        "rgba(123, 132, 135, 1)",
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom:0
                    }
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            color: "rgba(255, 255, 255, 0.3)",
                            zeroLineColor: "rgba(255, 255, 255, 0.3)"
                        },
                        ticks: {
                            fontColor: "white"
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            drawBorder: true
                        },
                        ticks: {
                            fontColor: "white",
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    if (track.audioAnalysis) {
        if (track.audioAnalysis === "loading") {
            audioAnalysis = (<p className="loading">Analyzing track audio <span>.</span> <span>.</span> <span>.</span></p>);
        } else {
            audioAnalysis = (
                <div className="audio-analysis-grid">
                    <div>
                        <h3>{track.audioAnalysis.bars.length}</h3>
                        <p>Bars</p>
                    </div>
                    <div>
                        <h3>{track.audioAnalysis.beats.length}</h3>
                        <p>Beats</p>
                    </div>
                    <div>
                        <h3>{formatDuration(track.duration_ms)}</h3>
                        <p>Duration</p>
                    </div>
                    <div>
                        <h3>{parsePitchClass(track.audioFeatures.key)}</h3>
                        <p>Key</p>
                    </div>
                    <div>
                        <h3>{track.audioFeatures.mode === 0 ? "Minor" : "Major"}</h3>
                        <p>Modality</p>
                    </div>
                    <div>
                        <h3>{track.audioAnalysis.sections.length}</h3>
                        <p>Sections</p>
                    </div>
                    <div>
                        <h3>{track.audioAnalysis.segments.length}</h3>
                        <p>Segments</p>
                    </div>
                    <div>
                        <h3>{track.audioAnalysis.tatums.length}</h3>
                        <p>Tatums</p>
                    </div>
                    <div>
                        <h3>{Math.round(track.audioFeatures.tempo)}</h3>
                        <p>Tempo</p>
                    </div>
                    <div>
                        <h3>{track.audioFeatures.time_signature}</h3>
                        <p>Time Signature</p>
                    </div>
                </div>
            );
        }
    }
    if (track.lyrics) {
        if (track.lyrics === "loading") {
            lyrics = <p className="loading">Finding lyrics <span>.</span> <span>.</span> <span>.</span></p>;
        } else {
            lyrics = <div dangerouslySetInnerHTML={{__html: track.lyrics}}></div>;
        }
    }
    return (
        <div id="track-modal" className="modal fade">
            <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <div>
                            <h3 className="modal-title">{track.name}</h3>
                            <h4>{track.artists[0].name}</h4>
                            <div id="track-button-grid">
                                {accessToken && 
                                    <React.Fragment>
                                        <PlaylistDropdown dropDirection="dropright" playlists={playlists} track={track}/>
                                        <div className="option-box">
                                            <img className="option-icon" src={heartIcon} alt="like" onClick={()=> updateTrack(track.id)} height="20"/>
                                        </div>
                                    </React.Fragment>
                                }
                                <a href={track.external_urls.spotify} className="button-spotify" target="_blank" rel="noopener noreferrer">                            
                                    <i className="fab fa-spotify"></i>
                                </a>                        
                            </div> 
                        </div>
                        <div>
                            <button id="track-modal-close" type="button" className="close track-modal-close" data-dismiss="modal">&times;</button>
                        </div>
                    </div>
                    <div className="modal-body"> 
                        <section className="section-title"> 
                            <h2>Audio analysis</h2>
                        </section>
                        {audioAnalysis}
                        <div className={data ? "chart-container": "d-none"}>
                            <canvas id="chart"></canvas>
                        </div>
                        <section className="section-title">
                            <h3>Lyrics</h3>
                        </section>
                        {lyrics}
                    </div>
                </div>
            </div>
        </div>
    );
};

TrackModal.propTypes = {
    allCookies: PropTypes.object,
    playlists: PropTypes.object,
    removeTrack: PropTypes.func.isRequired,
    saveTrack: PropTypes.func.isRequired,
    track: PropTypes.object.isRequired
};

export default withCookies(TrackModal);