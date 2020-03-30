import React, {useLayoutEffect} from "react";

const Alert = ({children, removeAlert}) => {
    useLayoutEffect(() => {
        const timeout = setTimeout(removeAlert, 3000);
        return () => clearTimeout(timeout);
    },[removeAlert]);
    return(
        <div className="alert fade show" role="alert">
            {children}
            <button type="button" className="close" aria-label="Close" onClick={removeAlert}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    );
};

export default Alert;