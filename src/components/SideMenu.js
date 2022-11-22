import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFilm,
    faGears,
    faSearch,
    faTv
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";

import "../style/SideMenu.css";
import { useInstance } from "react-ioc";
import { ActiveHandler } from "../store/ActiveHandler";
import { addKeyHandler, keyCodes, removeKeyHandler } from "../helpers/Utility";

const SideMenu = () => {
    const [isActive, setActive] = useState(false);

    const keyHandler = useInstance(ActiveHandler);

    const [currentActive, setCurrent] = useState(0);

    useEffect(() => {
        if (keyHandler.keyHandler == "SideMenu") {
            addKeyHandler(handleKey);
            setActive(true);
        } else {
            removeKeyHandler(handleKey);
            setActive(false);
        }

        return () => {
            removeKeyHandler(handleKey);
            setActive(false);
        };
    }, [keyHandler.keyHandler, currentActive]);

    const handleKey = ev => {
        switch (ev.keyCode) {
            case keyCodes().up:
                up();
                break;
            case keyCodes().down:
                down();
                break;
            case keyCodes().right:
                right();
                break;
            default:
                break;
        }
    };

    const up = () => {
        if (currentActive > 0) {
            setCurrent(currentActive - 1);
        }
    };

    const down = () => {
        if (currentActive != 3) {
            setCurrent(currentActive + 1);
        }
    };

    const right = () => {
        // keyHandler.setActive(keyHandler.prevActive);
        keyHandler.setActive("Movies");
    };

    return (
        <div className={`SideMenu ${isActive ? "open" : ""}`}>
            <div
                className={`sidebar-item ${(isActive && currentActive == 0) ? "active" : ""}`}
            >
                <FontAwesomeIcon
                    icon={faTv}
                    color="white"
                    size="3x"
                    className="icon"
                />
                {isActive && <span>Home</span>}
            </div>
            <div
                className={`sidebar-item ${isActive &&  currentActive == 1 ? "active" : ""}`}
            >
                <FontAwesomeIcon
                    icon={faFilm}
                    color="white"
                    size="3x"
                    className="icon"
                />
                {isActive && <span>Movies</span>}
            </div>
            <div
                className={`sidebar-item ${ isActive && currentActive == 2 ? "active" : ""}`}
            >
                <FontAwesomeIcon
                    icon={faSearch}
                    color="white"
                    size="3x"
                    className="icon"
                />
                {isActive && <span>Search</span>}
            </div>
            <div
                className={`sidebar-item ${isActive &&  currentActive == 3 ? "active" : ""}`}
            >
                <FontAwesomeIcon
                    icon={faGears}
                    color="white"
                    size="3x"
                    className="icon"
                />
                {isActive && <span>Settings</span>}
            </div>
        </div>
    );
};

export default observer(SideMenu);
