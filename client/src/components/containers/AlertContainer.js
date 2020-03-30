import React from "react";
import {connect} from "react-redux";
import {removeAlert} from "../../redux/actions/alert";
import Alert from "../presentational/Alert";

const AlertContainer = ({alerts, removeAlert}) => {
    return (
        <div className="alert-container">
            {alerts.map(alert => (
                <Alert key={alert.id} removeAlert={() => removeAlert(alert.id)}>
                    <span>{alert.message}</span>
                </Alert>
            ))}
        </div>
    );
};

const mapStateToProps = (state) => state.alert;

const mapDispatchToProps = (dispatch) => ({
    removeAlert: (id) => dispatch(removeAlert(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(AlertContainer);