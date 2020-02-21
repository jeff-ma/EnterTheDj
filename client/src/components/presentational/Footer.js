import React from 'react';
// import config from "../../config";
import bruceLeeDj from '../../images/bruce-lee-dj.png';
import spotifyLogo3 from '../../images/spotifyLogo3.png';
import signature2 from '../../images/signature2.png';
import '../../styles/footer.scss';
// import { PropTypes } from 'prop-types';

const Footer = (props) => {
    // autoplay = (e) => {
    //     const iframe = document.getElementById("player");
    //     const player = iframe.contentDocument || iframe.contentWindow.document;
    //     // const player = e.target;
    //     const playButton = player.querySelector('[title="Play"]') || player.querySelector('#play-button');
    //     // let playButton = document.getElementById("#player");
    //     // console.log(playButton);
    //     setTimeout(()=>{playButton.click()}, 500);
    // }

        // const { audioId, audioType } = this.props;
        return (
            <footer>
                <div className="container">
                    <section id="footer-section">
                        <div id="footer-logo" className="">
                            <h3 id="footer-heading">ENTER THE DJ</h3>
                            <img id="bruce-lee-image" src={bruceLeeDj} alt="Bruce Lee" />                            
                            <img id="bruce-lee-signature" src={signature2} alt="spotify logo" />
                        </div>    
                        <div>
                            <ul id="footer-nav">
                                <li>
                                    <div>Email:</div><p><a href="mailto: JeffMaEmail@gmail.com">JeffMaEmail@gmail.com</a></p>
                                </li>
                                <li>
                                    <div>Portfolio:</div><p><a href="http://www.jeffma.website/" target="_blank" rel="noopener noreferrer">www.JeffMa.website</a></p>
                                </li>
                                <li>
                                    <div>Github:</div><p><a href="https://github.com/jeff-ma" target="_blank" rel="noopener noreferrer">https://github.com/jeff-ma</a></p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <div>
                                <p>Powered by</p>
                                <img id="spotify-logo" src={spotifyLogo3} alt="spotify logo" />
                            </div>
                            <div>
                                <p id="developed-by">Developed by Jeff Ma</p>
                                <p id="copyright">Copyright &copy;2019</p>                            
                            </div>
                        </div>
                    </section>
                </div>
            </footer>
        );
};

// Footer.PropTypes = {
//     isLoading: PropTypes.bool,
//     isLoggedIn: PropTypes.bool,
//     track: PropTypes.string
// }

export default Footer;