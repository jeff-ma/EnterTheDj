import { connect } from 'react-redux';
import { getShowRequest } from '../../redux/actions/show';
import { updateAudio } from '../../redux/actions/footer';
import Show from '../presentational/Show';

const mapStateToProps = (state) => {
    return state.show;
};

const mapDispatchToProps = (dispatch) => ({
    onload: (showId) => dispatch(getShowRequest(showId)),
    updateAudio: (audioId, audioType) => dispatch(updateAudio(audioId, audioType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);