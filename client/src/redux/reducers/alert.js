import {
    ADD_ALERT, 
    REMOVE_ALERT
} from "../actions/alert";

const initialState = {
    alerts: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ALERT:
            return {alerts: [...state.alerts, {id: Math.floor(Math.random() * 1000), message: action.message}]};
        case REMOVE_ALERT:
            return {alerts: state.alerts.filter((alert) => alert.id !== action.id)};
        default:
            return state;
    }
};