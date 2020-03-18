import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import "../../styles/tiles.scss";
import noImage from "../../images/no-image.jpg";

const Tiles = ({data, path}) => {
    let tileImageClass = "tile-image";
    let tileTitle = "tile-title";
    if (path === "artist") {
        tileImageClass = tileImageClass + " rounded-circle";
        tileTitle = tileTitle + " text-center";
    }
    if (data && data.items) {
        const tiles = data.items.map((item, index) => {
            let image = noImage;
            let subtitle;
            if (item.icons && item.icons[0]) {
                image = item.icons[0].url;
            } else if (item.images && item.images.length > 1) {
                image = item.images[1].url;    
            } else if (item.images && item.images[0]) {
                image = item.images[0].url;
            }
            if (path === "album" || path === "show") {
                subtitle = (
                    <div className="tile-subtitle">
                        {path === "album" && <Link to={`/artist/${item.artists[0].id}`}>{item.artists[0].name}</Link>}
                        {path === "show" && <Link to={`/show/${item.id}`}>{item.publisher}</Link>}
                    </div>
                );        
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
        });
        return (
            <div className="grid-container">
                {tiles}
            </div>
        );
    } else {
        return <div>Nothing to load</div>;
    }
};

Tiles.propTypes = {
    data: PropTypes.object.isRequired,
    path: PropTypes.string
};

export default Tiles;