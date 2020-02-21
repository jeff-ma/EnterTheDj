import { connect } from 'react-redux';
import { getShowRequest } from '../../redux/actions/show';
import { updatePlayer } from '../../redux/actions/player';
import Show from '../presentational/Show';

const mapStateToProps = (state) => {
    return state.show;
};

const mapDispatchToProps = (dispatch) => ({
    onload: (showId) => dispatch(getShowRequest(showId)),
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);