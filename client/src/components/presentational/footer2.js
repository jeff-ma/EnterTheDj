import React, { Component } from 'react';
import '../../styles/footer.scss';
// import { PropTypes } from 'prop-types';

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    autoplay = (e) => {
        const iframe = document.getElementById("player");
        const player = iframe.contentDocument || iframe.contentWindow.document;
        // const player = e.target;
        const playButton = player.querySelector('[title="Play"]') || player.querySelector('#play-button');
        // let playButton = document.getElementById("#player");
        // console.log(playButton);
        setTimeout(()=>{playButton.click()}, 500);
    }

    render() {
        const { audioId, audioType } = this.props;
        return (
            <footer>
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 bruce">
                            <h3 id="footer-heading">ENTER THE DJ</h3>
                            <img id="bruce-lee-image" src="/images/bruce-logo2.jpg" alt="Bruce Lee"/>
                            {/* <div> */}
                                <img id="bruce-lee-signature" src="/images/signature2.png" alt="spotify logo" />
                            {/* </div> */}
                        </div>    
                        <div className="col-md-3">
                            <ul id="footer-nav">
                                <li>
                                    <div>Email:</div><p><a href="mailto: JeffMaEmail@gmail.com">JeffMaEmail@gmail.com</a></p>
                                </li>
                                <li>
                                    <div>Portfolio:</div><p><a href="http://www.jeffma.website/" target="_blank">www.JeffMa.website</a></p>
                                </li>
                                <li>
                                    <div>Github:</div><p><a href="#" target="_blank">https://github.com/jeff-ma</a></p>
                                </li>
                            </ul>
                        </div>
                        <div id="credits" className="col-md-4">
                                <p>Powered by</p>
                                <div>
                                    <img id="spotify-logo" src="/images/spotifyLogo2.png" alt="spotify logo" />
                                </div>
                            <p id="copyright">Copyright &copy;2019</p>
                            <p id="developed-by">Developed by <a href="http://jeffma.website/">Jeff Ma</a></p>
                        </div>
                    </div>
                </div>
                {/* <iframe id="player" src="https://open.spotify.com/embed/playlist/37i9dQZEVXcV1cScEuIUFG" /> */}
                {/* <iframe id="player" src={url} allow="encrypted-media"/> */}
                {audioId && audioType &&
                    // <iframe id="player" title="player" src={`/api/embed/${audioType}/${audioId}`} allowtransparency="false" allow="encrypted-media" onLoad={this.autoplay}></iframe>
                    <iframe id="player" title="player" src={`https://open.spotify.com/embed/${audioType}/${audioId}`} allowtransparency="false" allow="encrypted-media" onLoad={this.autoplay}></iframe>
                }
                
                {/* <iframe src="https://open.spotify.com/embed-podcast/episode/4pTMDo8LnguqZsnywEAUdw" width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe> */}
            </footer>
        );
    }
}

// Footer.PropTypes = {
//     isLoading: PropTypes.bool,
//     isLoggedIn: PropTypes.bool,
//     track: PropTypes.string
// }

export default Footer;