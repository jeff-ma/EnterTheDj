import React from 'react';
// import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// import queryString from 'query-string';
// import Pagination from './Pagination';
import '../../styles/tiles.scss';
import noImage from '../../images/no-image.jpg';

const Tiles = (props) => {
    const { data, path } = props;
    let tileImageClass = "tile-image";
    let tileTitle = "tile-title";
    let subtitle;

    if (path === "artist") {
        tileImageClass = tileImageClass + " rounded-circle";
        tileTitle = tileTitle + " text-center"
    }
    console.log(props);
    if (data && data.items) {
        return (
            <div className="grid-container">
            {data.items.map((item, index) => {
                let image = noImage;
                if (path === "album") {
                    const artist = item.artists[0];
                    subtitle = (
                        <div className="tile-subtitle">
                            <Link to={`/artist/${artist.id}`}>{artist.name}</Link>                            
                        </div>
                    );        
                }
                if (path === "show") {
                    subtitle = (
                        <div className="tile-subtitle">
                            <Link to={`/show/${item.id}`}>{item.publisher}</Link>
                        </div>
                    );      
                }
                if (item.icons && item.icons[0]) {
                    image = item.icons[0].url;
                } else if (item.images && item.images[0]) {
                    image = item.images[0].url;    
                }
                return (
                    <div className="tile" key={index}>
                        <div className="tile-image-box">
                            <Link to={`/${path}/${item.id}`}>
                                <img className={tileImageClass} src={image} alt={item.name}/>
                            </Link>
                        </div>
                        <div className={tileTitle}>
                            <Link to={`/${path}/${item.id}`}>{item.name}</Link>
                        </div>
                        {subtitle}
                    </div>
                );
            })
            } 
            </div>
        );
        
    } else {
        return <div>Nothing to load</div>;
    }
};

// Tiles.propTypes = {
//     data: PropTypes.object
// };

export default Tiles;