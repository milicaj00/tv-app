import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { useInstance } from "react-ioc";
import { addKeyHandler, keyCodes, removeKeyHandler } from "../helpers/Utility";
import { ActiveHandler } from "../store/ActiveHandler";

import "../style/modal.css";

const Modal = ({ onClose, open, children }) => {
    const keyStore = useInstance(ActiveHandler);

    useEffect(() => {
        if (keyStore.keyHandler == "Modal") {
            addKeyHandler(handleKey);
        } else {
            removeKeyHandler(handleKey);
        }

        return () => {
            removeKeyHandler(handleKey);
        };
    }, [keyStore.keyHandler]);

    const handleKey = ev => {
        if (ev.keyCode == keyCodes().back) {
            onEsc();
        }
    };

    const onEsc = () => {
        onClose();
    };

    return (
        <div
            className={
                open && keyStore.keyHandler == "Modal"
                    ? "modal display-block"
                    : "modal display-none"
            }
        >
            <section className="modal-main">{children}</section>
        </div>
    );
};

export default observer(Modal);
