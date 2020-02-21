import React, {useLayoutEffect, useRef} from 'react';
import '../../styles/alert.scss';

const Alert = (props) => {
    const closeButton = useRef();
    const {removeAlert} = props;
    useLayoutEffect(() => {
        let timeout = setTimeout(() => removeAlert(), 5000);
        return () => clearTimeout(timeout);
    },[removeAlert]);

    return(
    <div className="alert alert-dark fade show" role="alert">
        {props.children}
        <button type="button" className="close" aria-label="Close" ref={closeButton} onClick={props.removeAlert}>
        <span aria-hidden="true">&times;</span>
        </button>
    </div>);
};

export default Alert;