import React from "react";
import bruceLeeDj from "../../images/bruce-lee-dj.png";
import spotifyLogo from "../../images/spotify-logo.png";
import signature from "../../images/signature.png";
import "../../styles/footer.scss";

const Footer = () => (
    <footer>
        <div className="container">
            <section id="footer-section">
                <div id="footer-logo">
                    <h3 id="footer-heading">ENTER THE DJ</h3>
                    <img id="bruce-lee-dj" src={bruceLeeDj} alt="Bruce Lee"/>                            
                    <img id="bruce-lee-signature" src={signature} alt="Bruce Lee signature"/>
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
                        <img id="spotify-logo" src={spotifyLogo} alt="spotify logo" />
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

export default Footer;