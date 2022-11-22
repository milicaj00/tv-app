import { observer } from "mobx-react";
import React from "react";
import { useInstance } from "react-ioc";

import placeholderImage from "../images/movie-placeholder.png";
import { ActiveMovieStore } from "../store/ActiveMovie";
import "../style/fullMovieInfo.css";

const FullMovieInfo = () => {
    const activeMovie = useInstance(ActiveMovieStore);

    const handleError = e => {
        e.target.src = placeholderImage;
    };
    return (
        <div className="FullMovieInfo">
            <div className="image-info-cont">
                <div className="image-cont">
                    <img
                        className="modal-movie-image"
                        src={activeMovie.movieInfo.movie_image}
                        onError={handleError}
                    />
                </div>
                <div className="info-cont">
                    <h2>{"  " + activeMovie.movieInfo.o_name}</h2>
                    <div>
                        <span className="bold-span">Genre:</span>
                        {"  " + activeMovie.movieInfo.genre}
                    </div>
                    <div>
                        <span className="bold-span">Rating:</span>
                        {"  " + activeMovie.movieInfo.rating}
                    </div>
                    <div>
                        <span className="bold-span">Duration:</span>
                        {"  " + activeMovie.movieInfo.duration}
                    </div>
                </div>
            </div>
            <div className="description-cont">
                <p>{"  " + activeMovie.movieInfo.description}</p>
                <div>
                    <span className="bold-span">Cast:</span>
                    {"  " + activeMovie.movieInfo.cast}
                </div>
                <div>
                    <span className="bold-span">Director:</span>
                    {"  " + activeMovie.movieInfo.director}
                </div>
            </div>
        </div>
    );
};

export default observer(FullMovieInfo);
