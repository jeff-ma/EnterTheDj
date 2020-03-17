import React from 'react';
import {randomQuote} from '../../utils';
import '../../styles/notFound.scss';
import bruceReady from '../../images/bruce-ready.png';

export default () => (
    <section id="not-found">
        <h3>Couldn't find that but here is some wisdom for the way</h3>
        <div><img src={bruceReady} alt="Bruce Lee"/></div>
        <blockquote>"{randomQuote()}"</blockquote>
        <blockquote>-Bruce Lee</blockquote>
    </section>
);