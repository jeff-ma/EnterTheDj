import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
// import '../../styles/playlists.scss';

class Playlists extends Component {
    constructor(props) {
        super(props);

        const cookies = new Cookies();
        this.state = {
            accessToken: cookies.get("access_token")
        }
    }

    componentDidMount() {
        // only get playlists if logged in
        const { accessToken } = this.state;
        if(accessToken) {
            this.props.onload(accessToken);
        }
    }

    render() {
        const { accessToken } = this.state;
        let content;
        if(accessToken) {
            const { playlists } = this.props;
            if(playlists.items && playlists.items.length > 0) {
                content = playlists.items.map((playlist) => <div><Link to={`/playlists/${playlist.id}`}><img src={playlist.images[0].url} height="150" width="150"/></Link><p>{playlist.name}</p></div>)
            } else {
                content = <p>You have no playlists.</p>;
            }
        } else {
            content = <p>please login to view your playlists</p>;
        }
        return (
            <React.Fragment>
                <h1>Playlists</h1>
                {content}
            </React.Fragment>
        );
    }
};

// Playlists.propTypes = {
//     playlists: PropTypes.array
// };


export default Playlists;