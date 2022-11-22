import { observer } from "mobx-react";
import React, { useState, useEffect } from "react";
import { useInstance } from "react-ioc";
import { ActiveHandler } from "../store/ActiveHandler";

import { addKeyHandler, keyCodes, removeKeyHandler } from "../helpers/Utility";

import "../style/buttons.css";

const HorisontalButtons = () => {
    const keyStore = useInstance(ActiveHandler);

    const [activeButton, setActiveButton] = useState(0);

    useEffect(() => {
        if (keyStore.keyHandler === "Buttons") {
            addKeyHandler(onKeyDown);
        } else {
            removeKeyHandler(onKeyDown);
        }

        return () => {
            removeKeyHandler(onKeyDown);
        };
    }, [keyStore.keyHandler, activeButton]);

    const onKeyDown = ev => {
        switch (ev.keyCode) {
            case keyCodes().down:
                down();
                break;
            case keyCodes().right:
                right();
                break;
            case keyCodes().left:
                left();
                break;

            default:
                break;
        }
    };

    const down = () => {
        removeKeyHandler(onKeyDown);
        keyStore.setActive("Movies");
    };
    const left = () => {
        if (activeButton == 1) {
            setActiveButton(0);
        } else {
            keyStore.setActive("SideMenu");
        }
    };
    const right = () => {
        if (activeButton == 0) {
            setActiveButton(1);
        }
    };

    return (
        <div className="HorisontalButtons">
            <button
                className={`blue-button ${
                    keyStore.keyHandler === "Buttons" && activeButton == 0
                        ? "active"
                        : ""
                }`}
            >
                gledaj
            </button>
            <button
                className={`white-button ${
                    keyStore.keyHandler === "Buttons" && activeButton == 1
                        ? "active"
                        : ""
                }`}
            >
                favoriti
            </button>
        </div>
    );
};

export default observer(HorisontalButtons);
