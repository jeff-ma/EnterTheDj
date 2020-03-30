import React from "react";
import {randomQuote} from "../../utils";

const Loader = () => (
    <div className="loader">
        <div className="loader-wrapper">
            <div className="equalizer">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <blockquote className="quote">"{randomQuote()}"</blockquote>
            <blockquote className="signature">-Bruce Lee</blockquote>
        </div>
    </div>
);

export default Loader;