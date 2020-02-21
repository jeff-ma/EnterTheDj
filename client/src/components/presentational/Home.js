import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import Loader from './Loader';
import '../../styles/home.scss';

const Home = (props) => {
    const { albums, featured, mostPopular, topSongs, newShows, top50, featuredPlaylists, isLoading } = props;
    const swiperParams = {
        breakpoints: {
            // 575: {
            //     slidesPerView: 1,
            // },
            700: {
                slidesPerView: 2,
            },
            810: {
                slidesPerView: 3,
            },
            1020: {
                slidesPerView: 4,
            },
            1230: {
                slidesPerView: 5,
            }
        },
        containerClass: "swiper-container swiper-tiles-container",
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            hide: false
        },
        slidesPerView: 6,
        spaceBetween: 30,
    }
    const tile = (key, link, tileImage, tileTitle, tileArtist) => (
        <div key={key}>
            <Link to={link}>
                <img className="tile-image" src={tileImage} alt={tileTitle}/>
                <div className="tile-title">{tileTitle}</div>
                <p className="tile-artist">{tileArtist}</p>
            </Link>
        </div>
    ); 

    if(isLoading) {
        return <Loader/>;
    } else {
        return (
            <React.Fragment>
                <div id="new-release-hero">               
                    <Swiper 
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
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
                    >
                        {featured.map((album, index) => 
                            <div key={index}>
                                <img className="swiper-slide-image" src={album.images[0].url} alt={album.name} />
                                <div className="swiper-slide-caption">
                                    <p className="swiper-slide-category">Latest</p>
                                    <Link to={`/album/${album.id}`}>
                                    <h3 className="tile-title">{album.name}</h3>
                                    <p className="tile-artist">{album.artists[0].name}</p>
                                    </Link>
                                    </div>
                                </div>
                        )}
                    </Swiper>
                </div>
                <div id="main-wrapper" className="container-fluid">
                <section className="container">
                    <h2 className="section-title swiper-title">New Releases</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {albums.map((album, index) =>
                            tile(index, `/album/${album.id}`, album.images[0].url, album.name, album.artists[0].name)
                        )}
                    </Swiper>  
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Popular Albums</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {mostPopular.map((popular, index) =>
                            tile(index, `/album/${popular.track.album.id}`, popular.track.album.images[0].url, popular.track.album.name, popular.track.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Hit Songs</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {topSongs.map((top, index) =>
                            tile(index, `/album/${top.track.album.id}`, top.track.album.images[0].url, top.track.album.name, top.track.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Top Charts</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {top50.map((top, index) =>
                            tile(index, `/playlist/${top.id}`, top.images[0].url, top.name, top.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Featured Playlists</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {featuredPlaylists.map((featuredPlaylist, index) =>
                            tile(index, `/playlist/${featuredPlaylist.id}`, featuredPlaylist.images[0].url, featuredPlaylist.name, featuredPlaylist.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Fresh Podcasts</h2>
                    <Swiper className="swiper-container" {...swiperParams}>
                        {newShows.map((newShow, index) => 
                            tile(index, `/show/${newShow.id}`, newShow.images[0].url, newShow.name, newShow.publisher)
                        )}
                    </Swiper> 
                </section>
                </div>
            </React.Fragment>
        );
    }
};

Home.propTypes = {
    albums: PropTypes.array,
    mostPopular: PropTypes.array,
    isLoading: PropTypes.bool,
    onload: PropTypes.func,
    topSongs: PropTypes.array
}

export default Home;