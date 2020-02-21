export const ADD_ALERT = 'ADD_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';

export const addAlert = (message) => ({
    type: ADD_ALERT,
    message
});

export const removeAlert = (id) => ({
    type: REMOVE_ALERT,
    id
});