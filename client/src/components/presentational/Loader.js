import React from "react";
import {randomQuote} from "../../utils";
import "../../styles/loader.scss";

const Loader = () => (
    <div id="loader">
        <div id="loader-box">
            <div id="equalizer">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <blockquote id="quote">"{randomQuote()}"</blockquote>
            <blockquote id="signature">-Bruce Lee</blockquote>
        </div>
    </div>
);

export default Loader;