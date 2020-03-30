import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import noImage from "../../images/no-image.jpg";

const Tiles = ({data, path}) => {
    if (data && data.items) {
        return (
            <div className="tiles-grid">
                {data.items.map((item, index) => {
                    let image = noImage;
                    if (item.icons && item.icons[0]) {
                        image = item.icons[0].url;
                    } else if (item.images && item.images.length > 1) {
                        image = item.images[1].url;    
                    } else if (item.images && item.images[0]) {
                        image = item.images[0].url;
                    }
                    return (
                        <div className="tile" key={index}>
                            <div className="tile-image-box">
                                <Link to={`/${path}/${item.id}`}>
                                    <img className={path === "artist" ? "tile-image rounded-circle" : "tile-image"} src={image} alt={item.name}/>
                                </Link>
                            </div>
                            <p className={path === "artist" ? "tile-title text-center" : "tile-title"}>
                                <Link to={`/${path}/${item.id}`}>{item.name}</Link>
                            </p>
                            {(path === "album" || path === "show") && 
                                <p className="tile-subtitle">
                                    {path === "album" && <Link to={`/artist/${item.artists[0].id}`}>{item.artists[0].name}</Link>}
                                    {path === "show" && item.publisher}
                                </p>
                            }
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <p>Nothing to load</p>;
    }
};

Tiles.propTypes = {
    data: PropTypes.object.isRequired,
    path: PropTypes.string
};

export default Tiles;