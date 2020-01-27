import React from "react";
import { ModalWrapper, ModalBoxSetup, ModalBg } from "./Modal.styles";

/*
visible: boolean,
dismiss: function on click on Close.
*/
const ModalSetup = ({ visible, dismiss, children, client }) => (
    <React.Fragment>
        {visible ? (
            <ModalWrapper>
                <ModalBoxSetup width={client}>{children} </ModalBoxSetup>
                <ModalBg onClick={dismiss} />
            </ModalWrapper>
        ) : null}
    </React.Fragment>
)

export default ModalSetup