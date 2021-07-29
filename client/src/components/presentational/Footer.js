import React from "react";
import bruceLeeDj from "../../images/bruce-lee-dj.png";
import spotifyLogo from "../../images/spotify-logo.png";
import signature from "../../images/signature.png";

const Footer = () => (
    <footer>
        <section className="container">
            <div>
                <h3>ENTER THE DJ</h3>
                <img id="bruce-lee-dj" src={bruceLeeDj} alt="Bruce Lee"/>                            
                <img id="bruce-lee-signature" src={signature} alt="Bruce Lee signature"/>
            </div>    
            <div>
                <ul>
                    <li>
                        <p>Email:</p><p><a href="mailto: jeff@jeffma.dev">jeff@jeffma.dev</a></p>
                    </li>
                    <li>
                        <p>Portfolio:</p><p><a href="https://jeffma.dev/" target="_blank" rel="noopener noreferrer">https://jeffma.dev</a></p>
                    </li>
                    <li>
                        <p>Github:</p><p><a href="https://github.com/jeff-ma" target="_blank" rel="noopener noreferrer">https://github.com/jeff-ma</a></p>
                    </li>
                </ul>
            </div>
            <div>
                <div>
                    <p>Powered by</p>
                    <a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer">
                        <img id="spotify-logo" src={spotifyLogo} alt="spotify logo"/>
                    </a>
                </div>
                <div>
                    <p>Developed by Jeff Ma</p>
                    <p>Copyright &copy;2021</p>                            
                </div>
            </div>
        </section>
    </footer>
);

export default Footer;