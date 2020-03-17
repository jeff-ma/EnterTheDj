import React from "react";
import PropTypes from "prop-types";
import {withCookies} from "react-cookie";
import "../../styles/catalogHeader.scss";
import noImage from "../../images/no-image.jpg";

const CatalogHeader = ({action, catalog, children, allCookies}) => {
    const accessToken = allCookies.access_token;
    const image = catalog.images.length > 0 ? catalog.images[0].url : noImage;
    const imageClass = catalog.type === "artist" ? "rounded-circle" : "";
    const heartIcon = catalog.isSaved ? "fas fa-heart" : "far fa-heart";
    return (
        <section>
            <div className="catalog-details-grid">
                <div className="catalog-cover">
                    <img className={imageClass} src={image} alt="test"/>
                    <div className="catalog-button-grid hide-up-to-md">
                        {accessToken && 
                            <button className="button-outline" onClick={() => action(catalog.id)}>
                                <i className={heartIcon}></i>
                            </button>
                        }
                        <a href={catalog.external_urls.spotify} className="button-outline button-spotify" target="_blank" rel="noopener noreferrer">                            
                            <i className="fab fa-spotify"></i>
                        </a>                        
                    </div> 
                </div>
                <div className="catalog-info">
                    {children}
                </div>
            </div>
            <div className="catalog-button-grid hide-md-up">
                {accessToken && 
                    <button className="button-outline" onClick={() => action(catalog.id)}>
                        <i className={heartIcon}></i>
                    </button>
                }
                <a href={catalog.external_urls.spotify} className="button-outline button-spotify" target="_blank" rel="noopener noreferrer">                            
                    <i className="fab fa-spotify"></i>
                </a>                        
            </div> 
        </section>
    );
};


CatalogHeader.propTypes = {
    action: PropTypes.func,
    catalog: PropTypes.object.isRequired,
    children: PropTypes.node
};

export default withCookies(CatalogHeader);