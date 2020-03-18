import React from "react";
import {randomQuote} from "../../utils";
import "../../styles/loader.scss";

const Loader = () => (
    <div className="loader">
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
);

export default Loader;