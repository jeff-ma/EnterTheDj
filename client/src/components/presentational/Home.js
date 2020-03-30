import React from "react";
import {PropTypes} from "prop-types";
import {Link} from "react-router-dom";
import Swiper from "react-id-swiper";
import noImage from "../../images/no-image.jpg";

const Home = ({latestAlbums, newAlbums, mostPopular, turnItUp, bruceLeePicks, top50, featuredPlaylists, newShows}) => {
    const swiperParams = {
        breakpoints: {
            701: {
                slidesPerView: 3,
            },
            811: {
                slidesPerView: 4,
            },
            1051: {
                slidesPerView: 5,
            },
            1200: {
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
        <div key={key} className="swiper-tile">
            <Link to={link}>
                <img src={image} alt={title}/>
                <p>{title}</p>
                <p>{artist}</p>
            </Link>
        </div>
    ); 
    return (
        <React.Fragment>
            <div className="new-release-hero">               
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
                    {latestAlbums.map((latestAlbum, index) => 
                        <div key={index}>
                            <img className="swiper-slide-image" src={latestAlbum.images[0].url} alt={latestAlbum.name}/>
                            <div className="swiper-slide-caption">
                                <h3>Latest</h3>
                                <Link to={`/album/${latestAlbum.id}`}>
                                    <h4>{latestAlbum.name}</h4>
                                    <h5>{latestAlbum.artists[0].name}</h5>
                                </Link>
                            </div>
                        </div>
                    )}
                </Swiper>
            </div>
            <div className="container">
                <section>
                    <h2 className="section-title">New Releases</h2>
                    <Swiper {...swiperParams}>
                        {newAlbums.map((newAlbum, index) =>
                            swiperTile(index, `/album/${newAlbum.id}`, newAlbum.images.length > 0 && newAlbum.images[1].url, newAlbum.name, newAlbum.artists[0].name)
                        )}
                    </Swiper>  
                </section>
                <section>
                    <h2 className="section-title">Popular Albums</h2>
                    <Swiper {...swiperParams}>
                        {mostPopular.map((popular, index) =>
                            swiperTile(index, `/album/${popular.track.album.id}`, popular.track.album.images.length > 0 && popular.track.album.images[1].url, popular.track.album.name, popular.track.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section>
                    <h2 className="section-title">Turn It Up</h2>
                    <Swiper {...swiperParams}>
                        {turnItUp.map((up, index) =>
                            swiperTile(index, `/album/${up.id}`, up.images.length > 0 && up.images[1].url, up.name, up.artists[0].name)
                        )}
                    </Swiper> 
                </section>
                <section>
                    <h2 className="section-title">Bruce Lee Picks</h2>
                    <Swiper {...swiperParams}>
                        {bruceLeePicks.map((bruceLeePick, index) =>
                            swiperTile(index, `/album/${bruceLeePick.id}`, bruceLeePick.images.length > 0 && bruceLeePick.images[1].url, bruceLeePick.name, bruceLeePick.artists[0].name)
                        )}
                    </Swiper>  
                </section>
                <section>
                    <h2 className="section-title">Top Charts</h2>
                    <Swiper {...swiperParams}>
                        {top50.map((top, index) =>
                            swiperTile(index, `/playlist/${top.id}`, top.images.length > 0 && top.images[0].url, top.name, top.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section>
                    <h2 className="section-title">Featured Playlists</h2>
                    <Swiper {...swiperParams}>
                        {featuredPlaylists.map((featuredPlaylist, index) =>
                            swiperTile(index, `/playlist/${featuredPlaylist.id}`, featuredPlaylist.images.length > 0 && featuredPlaylist.images[0].url, featuredPlaylist.name, featuredPlaylist.owner.display_name)
                        )}
                    </Swiper> 
                </section>
                <section>
                    <h2 className="section-title">Fresh Podcasts</h2>
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