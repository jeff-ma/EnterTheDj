import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';

class Artist extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { artistId } = this.props.match.params;
        this.props.onload(artistId);
    }

    render() {
        const { isLoading, artist, albums, bio, recommendations } = this.props;
        if(isLoading) {
            // return bio;
            return <h1>loading...</h1>;
        } else {
            return (
                <React.Fragment>
                <section className="container-fluid">
                {artist.images && <img src={artist.images[0].url} alt={artist.name} />}
                </section>
                <h1>
                    {artist.name}
                </h1>
                <section id="bio" className="container" dangerouslySetInnerHTML={{__html: bio}}></section>
                
                <h2>Albums</h2>
                <Swiper className="swiper-container"
                autoplay={{
                    delay: 9999999,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    575: {
                        slidesPerView: 1,
                        // spaceBetween: 10
                    },
                    767: {
                        slidesPerView: 2,
                        // spaceBetween: 10
                    },
                    991: {
                        slidesPerView: 3,
                        // spaceBetween: 10
                    },
                    1199: {
                        slidesPerView: 4,
                        // spaceBetween: 10
                    }
                }}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
            
                scrollbar={{
                    el: '.swiper-scrollbar',
                    hide: false
                }}
                slidesPerView={5}
                spacesBetween={50}
            >
            {
                albums.map((album, index) => 
                    <div key={index}>
                    <Link to={`/album/${album.id}`}>
                        <img className="swiper-slide-image" src={album.images[0].url} alt={album.name} />
                        </Link>
                        <div className="swiper-slide-info">
                            <h3>{album.name}</h3>
                            {/* <p>{album.publisher}</p> */}
                        </div>
                    </div>
                )
            }
            </Swiper>
            <h2>Suggestions</h2>
            <Swiper className="swiper-container"
                autoplay={{
                    delay: 9999999,
                    disableOnInteraction: false
                }}
                breakpoints={{
                    575: {
                        slidesPerView: 1,
                        // spaceBetween: 10
                    },
                    767: {
                        slidesPerView: 2,
                        // spaceBetween: 10
                    },
                    991: {
                        slidesPerView: 3,
                        // spaceBetween: 10
                    },
                    1199: {
                        slidesPerView: 4,
                        // spaceBetween: 10
                    }
                }}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }}
            
                scrollbar={{
                    el: '.swiper-scrollbar',
                    hide: false
                }}
                slidesPerView={5}
                spacesBetween={50}
            >
            {
                recommendations.map((recommendation, index) => 
                    <div key={index}>
                    <Link to={`/album/${recommendation.album.id}`}>
                        <img className="swiper-slide-image" src={recommendation.album.images[0].url} alt={recommendation.album.name} />
                        </Link>
                        <div className="swiper-slide-info">
                            <h3>{recommendation.album.name}</h3>
                            {/* <p>{album.publisher}</p> */}
                        </div>
                    </div>
                )
            }
            </Swiper>
                </React.Fragment>
            );
        }
    };
};
Artist.propTypes = {
    artist: PropTypes.object,
    isLoading: PropTypes.bool 
}

export default Artist;