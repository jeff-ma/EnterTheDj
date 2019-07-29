import React, { Component } from 'react';
import { PropTypes }from 'prop-types';
import { Link } from 'react-router-dom';
import Swiper from 'react-id-swiper';
import queryString from 'query-string';
// import '../../styles/search.scss';
// const search = () => <h1>Search</h1>;

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: ""
        };
    }

    handleChange = (e) => {
        this.setState({searchInput: e.target.value});
    }

    handleClick = (e) => {
        this.props.search(this.state.searchInput);
    }

    updateSearch = () => {
        const search =  queryString.parse(this.props.location.search);
        if(search && search.q) {
            this.props.search(search.q);
        }
    }

    componentDidMount() {
        this.updateSearch();
    }

    componentDidUpdate(prevProps) {
        // if the search query string has changed and update the search
        const prevSearch = prevProps.location.search.toLowerCase();
        const currentSearch = this.props.location.search.toLowerCase();
        if(prevSearch !== currentSearch) {
            this.updateSearch();
        }
    }

    render() {
        let {albums,artists,playlists,shows,tracks} = this.props.searchResults;
        if(albums) {
            albums = (
            <section className="container">
            <h2>ALBUMS</h2>
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
    albums.items.map((album, index) => 
        <div key={index}>
            <Link to={`/album/${album.id}`}>
            <img className="swiper-slide-image" src={album.images[0].url} alt={album.name} />
            </Link>
            <div className="swiper-slide-info">
                <h3>{album.name}</h3>
                <p>{album.artists[0].name}</p>
            </div>
        </div>
    )
}
</Swiper> 
        </section>
            );
        } 
        // else {
            // albums="none";
        // }
        if(artists) {

        }
        if(playlists){

        }
        if(shows) {

        }
        if(tracks) {

        }
        return(
            <React.Fragment>
            <h1>Search</h1>
            {/* <form action="#" className="container" onSubmit={(e) => {e.preventDefault(); this.handleClick();}}>
                <div class="row no-gutters">
            <div class="col">
                <input
                    id="search-input" 
                    className="form-control" 
                    type="search" 
                    placeholder="Search"
                    value={this.state.searchText}
                    onChange={this.handleChange}
                />
            </div>
            <div class="col-auto">
                <button class="btn btn-primary" type="button" onClick={this.handleClick}>
                    Search
                </button>
            </div>
            </div>
            </form> */}
            {albums}
            <div>
            </div>
            </React.Fragment>
        );
    }
};

Search.propTypes = {

};

export default Search;