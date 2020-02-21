import React from 'react';

const Modal = (props) => {
    // const isLoading = props.isLoading || false;
    return (
        <div className="modal fade" id="myModal">
            <div className="modal-dialog modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">{props.title}</h4>
                        <p className="modal-sub-title">{props.subTitle}</p>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body" dangerouslySetInnerHTML={{__html: props.children}}>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">{props.closeButtonText || "Close"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Modal;