import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { useInstance } from "react-ioc";
import {
    addKeyHandler,
    addOnKeyUp,
    keyCodes,
    removeKeyHandler,
    removeKeyUp
} from "../helpers/Utility";

import placeholderImage from "../images/movie-placeholder.png";
import { ActiveHandler } from "../store/ActiveHandler";
import { ActiveMovieStore } from "../store/ActiveMovie";

import "../style/horisontalList.css";
import FullMovieInfo from "./FullMovieInfo";
import Modal from "./Modal";

let timer;

const HorisontalList = ({
    data,
    isActive,
    setNextActive,
    myIndex,
    lastIndex
}) => {
    const keyStore = useInstance(ActiveHandler);
    const activeMovie = useInstance(ActiveMovieStore);

    const [current, setCurrent] = useState(0);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(8);

    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (keyStore.keyHandler == "Movies" && isActive) {
            addKeyHandler(keyHandler);
            addOnKeyUp(onKeyUp);
        } else {
            removeKeyHandler(keyHandler);
            removeKeyUp(onKeyUp);
        }

        return () => {
            removeKeyHandler(keyHandler);
            removeKeyUp(onKeyUp);
        };
    }, [keyStore.keyHandler, isActive, first, last]);

    const keyHandler = ev => {
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
            case keyCodes().left:
                left();
                break;
            case keyCodes().enter:
                enter();
                break;
            default:
                break;
        }
    };

    const up = () => {
        if (myIndex === 0) {
            removeKeyHandler(keyHandler);
            removeKeyUp(onKeyUp);
            keyStore.setActive("Buttons");
        } else {
            setNextActive(myIndex - 1);
        }
    };

    const down = () => {
        if (!lastIndex) {
            setNextActive(myIndex + 1);
        }
    };

    const left = () => {
        if (first != 0) {
            setFirst(first => first - 1);
            setLast(last => last - 1);
        } else {
            removeKeyHandler(keyHandler);
            removeKeyUp(onKeyUp);
            keyStore.setActive("SideMenu");
        }
    };

    const right = () => {
        if (first < data.length - 1) {
            setFirst(first => first + 1);
            setLast(last => last + 1);
        }
    };

    const enter = async () => {
        await activeMovie.getFullMovieInfo();
        setOpenModal(true);
        keyStore.setActive("Modal");
    };

    const closeModal = () => {
        setOpenModal(false);
        keyStore.setActive("Movies");
    };

   
    const onKeyUp = ev => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            activeMovie.setActive(data[first]);
        }, 1000);
    };

    const handleError = e => {
        e.target.src = placeholderImage;
    };

    return (
        <div className="HorisontalList">
            <Modal open={openModal} onClose={closeModal}>
                <FullMovieInfo />
            </Modal>

            {data?.slice(first, last).map((el, i) => (
                <div
                    className={`movie-image-container ${
                        keyStore.keyHandler == "Movies" &&
                        isActive &&
                        current == i
                            ? "active"
                            : ""
                    }`}
                    key={el.stream_id}
                >
                    <img
                        src={el.stream_icon}
                        alt={el.name}
                        className="movie-image"
                        onError={e => handleError(e)}
                    />
                </div>
            ))}
        </div>
    );
};

export default observer(HorisontalList);
