import React from 'react';
import {connect} from 'react-redux';
import Alert from '../presentational/Alert';
import {removeAlert} from '../../redux/actions/alert';

const AlertContainer = (props) => {
    return (
        <div id="alert-container">
            {props.alerts.map(alert => 
                <Alert key={alert.id} removeAlert={() => props.removeAlert(alert.id)}>
                    <span>{alert.message}</span>
                </Alert>
            )}
        </div>
    );
};

const mapStateToProps = (state) => state.alert;

const mapDispatchToProps = (dispatch) => ({
    removeAlert: (id) => dispatch(removeAlert(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);