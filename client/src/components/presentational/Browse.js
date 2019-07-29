import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import '../../styles/browse.scss';

class Browse extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onload();
    }

    render() {
        console.log(this.props);
        const { categories, isLoading } = this.props;
        const {categoryId} = this.props.match.params;
  
        if(isLoading) {
            return (<h2>LOADING.....</h2>);
        } else {
        return <React.Fragment>
            <h2 className="section-title">{categoryId}</h2>
            {
                categories && 
                <div className="grid-container">
                    {
                        categories.items.map((category, index) => {
                            return (
                                <div className="tile">
                                    <div className="tile-image">
                                        <Link to={"/category/" + category.id}>
                                            <img className="category-art-image" src={category.icons[0].url}/>
                                        </Link>
                                    </div>
                                    <div className="tile-title">
                                        <Link to={"/category/" + category.id}>{category.name}</Link>
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

Browse.propTypes = {
    categories: PropTypes.object
};

export default Browse;