import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import Swiper from "react-id-swiper";
import "../../styles/home.scss";
import noImage from "../../images/no-image.jpg";

const Home = ({latestAlbums, newAlbums, mostPopular, turnItUp, bruceLeePicks, top50, featuredPlaylists, newShows}) => {
    const swiperParams = {
        breakpoints: {
            700: {
                slidesPerView: 3,
            },
            810: {
                slidesPerView: 4,
            },
            1020: {
                slidesPerView: 5,
            },
            1230: {
                slidesPerView: 6,
            }
        },
        containerClass: "swiper-container swiper-tiles-container",
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false
        },
        slidesPerView: 2,
        spaceBetween: 30,
    };
    const swiperTile = (key, link, image = noImage, title, artist) => (
        <div key={key}>
            <Link to={link}>
                <img className="tile-image" src={image} alt={title}/>
                <div className="tile-title">{title}</div>
                <p className="tile-artist">{artist}</p>
            </Link>
        </div>
    ); 
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
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev"
                    }}
                    scrollbar={{
                        el: ".swiper-scrollbar",
                        hide: false
                    }}
                >
                    {latestAlbums.map((album, index) => 
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
                    <Swiper {...swiperParams}>
                        {newAlbums.map((newAlbum, index) =>
                            swiperTile(index, `/album/${newAlbum.id}`, newAlbum.images.length > 0 && newAlbum.images[1].url, newAlbum.name, newAlbum.artists[0].name)
                        )}
                    </Swiper>  
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Popular Albums</h2>
                    <Swiper {...swiperParams}>
                        {mostPopular.map((popular, index) =>
                            swiperTile(index, `/album/${popular.track.album.id}`, popular.track.album.images.length > 0 && popular.track.album.images[1].url, popular.track.album.name, popular.track.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Turn It Up</h2>
                    <Swiper {...swiperParams}>
                        {turnItUp.map((up, index) =>
                            swiperTile(index, `/album/${up.id}`, up.images.length > 0 && up.images[1].url, up.name, up.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Bruce Lee Picks</h2>
                    <Swiper {...swiperParams}>
                        {bruceLeePicks.map((bruceLeePick, index) =>
                            swiperTile(index, `/album/${bruceLeePick.id}`, bruceLeePick.images.length > 0 && bruceLeePick.images[1].url, bruceLeePick.name, bruceLeePick.artists[0].name)
                        )}
                    </Swiper>  
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Top Charts</h2>
                    <Swiper {...swiperParams}>
                        {top50.map((top, index) =>
                            swiperTile(index, `/playlist/${top.id}`, top.images.length > 0 && top.images[0].url, top.name, top.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Featured Playlists</h2>
                    <Swiper {...swiperParams}>
                        {featuredPlaylists.map((featuredPlaylist, index) =>
                            swiperTile(index, `/playlist/${featuredPlaylist.id}`, featuredPlaylist.images.length > 0 && featuredPlaylist.images[0].url, featuredPlaylist.name, featuredPlaylist.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section className="container">
                    <h2 className="section-title swiper-title">Fresh Podcasts</h2>
                    <Swiper {...swiperParams}>
                        {newShows.map((newShow, index) => 
                            swiperTile(index, `/show/${newShow.id}`, newShow.images.length > 0 && newShow.images[1].url, newShow.name, newShow.publisher)
                        )}
                    </Swiper> 
                </section>
            </div>
        </React.Fragment>
    ); 
};

Home.propTypes = {
    latestAlbums: PropTypes.array.isRequired,
    newAlbums: PropTypes.array.isRequired,
    mostPopular: PropTypes.array.isRequired,
    turnItUp: PropTypes.array.isRequired,
    bruceLeePicks: PropTypes.array.isRequired,
    top50: PropTypes.array.isRequired,
    featuredPlaylists: PropTypes.array.isRequired,
    newShows: PropTypes.array.isRequired
};

export default Home;