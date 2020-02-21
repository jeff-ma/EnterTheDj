import React from 'react';
import { connect } from 'react-redux';
import { updatePlayer } from '../../redux/actions/player';
import Player from '../presentational/Player';

const PlayerContainer = (props) => <Player {...props} />;

const mapStateToProps = (state) => state.player;

const mapDispatchToProps = (dispatch) => ({
    updatePlayer: (audioId, audioType) => dispatch(updatePlayer(audioId, audioType))
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerContainer);