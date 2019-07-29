import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
// import '../../styles/category.scss';

class Category extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {categoryId} = this.props.match.params;
        this.props.onload(categoryId);
    }

    render() {
        console.log(this.props);
        const { playlists, isLoading } = this.props;
  
        if(isLoading) {
            return (<h2>LOADING.....</h2>);
        } else {
        return <React.Fragment>
            <h2 className="section-title">Category</h2>
            {playlists.items && 
            <div className="grid-container">
                {
                    playlists.items.map((playlist) => {
                        return (
                            <div className="tile">
                                <div className="tile-image">
                                    <Link to={"/playlists/" + playlist.id}>
                                        <img className="category-art-image" src={playlist.images[0].url}/>
                                    </Link>
                                </div>
                                <div className="tile-title">
                                    <Link to={"/playlists/" + playlist.id}>{playlist.name}</Link>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            }
        </React.Fragment>;
        }
    }
};

Category.propTypes = {
    playlists: PropTypes.object,
    isLoading: PropTypes.bool
};

export default Category;