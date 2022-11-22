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

const width = 222;
let timer;

const HorisontalList = ({
    data,
    isActive,
    setNextActive,
    myIndex,
    lastIndex,
    staticIndex
}) => {
    const keyStore = useInstance(ActiveHandler);
    const activeMovie = useInstance(ActiveMovieStore);

    const [current, setCurrent] = useState(0);
    const [first, setFirst] = useState(0);
    const [last, setLast] = useState(8);

    const [openModal, setOpenModal] = useState(false);
    const [translate, setTranslate] = useState(0);

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
    }, [keyStore.keyHandler, isActive, first, last, current, translate]);

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
        if (current > staticIndex) {
            setCurrent(current - 1);
        } else {
            if (first != 0) {
                setFirst(first - 1);
                setLast(last - 1);
                setTranslate(translate - width);
            } else if (current != 0) {
                setCurrent(current - 1);
            } else {
                removeKeyHandler(keyHandler);
                removeKeyUp(onKeyUp);
                keyStore.setActive("SideMenu");
            }
        }
    };

    const right = () => {
        if (current < staticIndex) {
            setCurrent(current + 1);
        } else {
            if (last < data.length) {
                setFirst(first + 1);
                setLast(last + 1);
                setTranslate(translate + width);
            } else if (current < 7) {
                setCurrent(current + 1);
            }
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
            activeMovie.setActive(data[current + first]);
        }, 500);
    };

    const handleError = e => {
        e.target.src = placeholderImage;
    };

    return (
        <>
            <Modal open={openModal} onClose={closeModal}>
                <FullMovieInfo />
            </Modal>
            <div
                className="HorisontalList"
                style={{
                    transform: `translateX(${translate}px)`
                }}
            >
                <div
                    className="horisontal-animation"
                    style={{
                        transform: `translateX(-${translate}px)`
                    }}
                >
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
            </div>
        </>
    );
};

export default observer(HorisontalList);
