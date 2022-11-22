import React from "react";
import HorisontalButtons from "./HorisontalButtons";

import { observer } from "mobx-react";
import { useInstance } from "react-ioc";
import { ActiveMovieStore } from "../store/ActiveMovie";

import placeholderImage from "../images/movie-placeholder.png";

import "../style/mainContainer.css";

const MovieInfo = () => {
    const activeMovie = useInstance(ActiveMovieStore);

    const handleError = e => {
        e.target.src = placeholderImage;
    };

    return (
        <div className="MovieInfo">
            <div>
                <img
                    src={activeMovie.movie?.stream_icon}
                    alt={activeMovie.movie?.name}
                    className="movie-info-image"
                    onError={e => handleError(e)}
                />
            </div>
            <div className="movie-info">
                <h1>Title: {activeMovie.movie?.name}</h1>
                <h3>Mark: {activeMovie.movie?.rating}</h3>
                <HorisontalButtons />
            </div>
        </div>
    );
};

export default observer(MovieInfo);
