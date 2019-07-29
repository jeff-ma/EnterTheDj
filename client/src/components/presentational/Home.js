import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import '../../styles/home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onload();
    }

    render() {
        const { albums, featured, mostPopular, topSongs, newShows, isLoading } = this.props;
        const newAlbumsParams = {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
              }
        };
        if(isLoading) {
            return (<h1>LOADING.....</h1>)
        } else {
        return (
            <React.Fragment>
            <section id="new-release-hero">               
                {this.props.topSongs &&
                <Swiper id="new-release-hero" className="swiper-container" 
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
                {
                    featured.map((album, index) => 
                    <div key={index}>
                        <img className="swiper-slide-image" src={album.images[0].url} alt={album.name} />
                        <div className="swiper-slide-caption">
                            <h3><Link to={`/album/${album.id}`}>{album.name}</Link></h3>
                            <p>{album.artists[0].name}</p>
                        </div>
                    </div>
                    )
                }
                </Swiper>
                }
            </section>
            <section className="container">
            <h2 className="section-title">New Releases</h2>
        {this.props.topSongs &&
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
        700: {
            slidesPerView: 2,
            // spaceBetween: 10
        },
        810: {
            slidesPerView: 3,
            // spaceBetween: 10
        },
        1020: {
            slidesPerView: 4,
            // spaceBetween: 10
        },
        1230: {
            slidesPerView: 5,
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
    slidesPerView={6}
    spaceBetween={30}
>
{
    albums.map((album, index) => 
        <div key={index}>
            <Link to={`/album/${album.id}`}>
            <img className="swiper-slide-image" src={album.images[0].url} alt={album.name} />
            </Link>
            <div className="swiper-slide-info">
                <div className="tile-title">{album.name}</div>
                <p>{album.artists[0].name}</p>
            </div>
        </div>
    )
}
</Swiper> 
} 
        </section>
        <section className="container">
            <h2 className="section-title">Popular Albums</h2>
        {this.props.topSongs &&
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
        700: {
            slidesPerView: 2,
            // spaceBetween: 10
        },
        810: {
            slidesPerView: 3,
            // spaceBetween: 10
        },
        1020: {
            slidesPerView: 4,
            // spaceBetween: 10
        },
        1230: {
            slidesPerView: 5,
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
    spaceBetween={30}
>
    {
        mostPopular.map((popular, index) =>
        <div key={index}>
        <Link to={`/album/${popular.track.album.id}`}>
            <img className="swiper-slide-image" src={popular.track.album.images[0].url} alt={popular.track.album.name} />
            </Link>
            <div className="swiper-slide-info">
            <div className="tile-title">{popular.track.album.name}</div>
                <p>{popular.track.artists[0].name}</p>
            </div>
        </div>
        )
    }
</Swiper> 
} 
        </section>
        <section className="container">
            <h2 className="section-title">Hit Songs</h2>
        {this.props.topSongs &&
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
        700: {
            slidesPerView: 2,
            // spaceBetween: 10
        },
        810: {
            slidesPerView: 3,
            // spaceBetween: 10
        },
        1020: {
            slidesPerView: 4,
            // spaceBetween: 10
        },
        1230: {
            slidesPerView: 5,
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
    spaceBetween={30}
>
{
    topSongs.map((top, index) => 
        <div key={index}>
        <Link to={`/album/${top.track.album.id}`}>
            <img className="swiper-slide-image" src={top.track.album.images[0].url} alt={top.track.name} />
            </Link>
            <div className="swiper-slide-info">
            <div className="tile-title">{top.track.name}</div>
                <p>{top.track.artists[0].name}</p>
            </div>
        </div>
    )
}
</Swiper> 
} 
        </section>
        <section className="container">
            <h2 className="section-title">Fresh Podcasts</h2>
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
        700: {
            slidesPerView: 2,
            // spaceBetween: 10
        },
        810: {
            slidesPerView: 3,
            // spaceBetween: 10
        },
        1020: {
            slidesPerView: 4,
            // spaceBetween: 10
        },
        1230: {
            slidesPerView: 5,
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
    spaceBetween={30}
>
{
    newShows.map((newShow, index) => 
        <div key={index}>
        <Link to={`/show/${newShow.id}`}>
            <img className="swiper-slide-image" src={newShow.images[0].url} alt={newShow.name} />
            </Link>
            <div className="swiper-slide-info">
            <div className="tile-title">{newShow.name}</div>
                <p>{newShow.publisher}</p>
            </div>
        </div>
    )
}
</Swiper> 
 
        </section>
            </React.Fragment>
        );
    }
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

// new
// most popular
// 37i9dQZEVXbMDoHDwVN2tF

// album page 
// artist page


