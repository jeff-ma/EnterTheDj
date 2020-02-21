import React from 'react';
import '../../styles/loader.scss';
import { randomQuote } from '../../utils';

const Loader = () => {
    return (
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
};

export default Loader;