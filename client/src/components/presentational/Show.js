import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
// import Swiper from 'react-id-swiper';
import '../../styles/home.scss';

// const Show = () => <h1>Show</h1>;
class Show extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { showId } = this.props.match.params
        this.props.onload(showId);
    }

    render() {
        const { show, isLoading, updateAudio } = this.props;
        if(isLoading) {
            return (<h1>LOADING.....</h1>);
        } else {
            return (
                <div id="show-header" className="container">
                    <section className="row">
                        <div className="col-sm-4"><img src={show.images[1].url} alt="show cover" /></div>
                        <div className="col-sm-8">
                        <h2>{show.publisher}</h2>
                        <h3>{show.name}</h3>
                        </div>
                    </section>
                    <section>
                        <h2 className="section-title">Episodes</h2>
                        <div className="tracks-wrapper">
                            <ul className="list-group list-group-flush">
                        {
                            show.episodes.items.map((episode, index) => (
                                <li key={index} className="list-group-item" onClick={()=>updateAudio(episode.id, "episode")}>
                                {episode.name}
                                </li>
                            ))
                        }
                            </ul>
                        </div>
                    </section>
                </div>
            );
        }
    }
};

Show.propTypes = {
    show: PropTypes.object,
    isLoading: PropTypes.bool,
}


// // new
// // most popular
// // 37i9dQZEVXbMDoHDwVN2tF

// // album page 
// // artist page
export default Show;