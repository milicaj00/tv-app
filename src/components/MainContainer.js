import React, { useState } from "react";
import MovieInfo from "./MovieInfo";
import MoviesContainer from "./MoviesContainer";

import "../style/mainContainer.css";

import headerLogo from "../images/headerLogo.png";

const MainContainer = () => {
    return (
        <div className="MainContainer">
            <img src={headerLogo} className="logo" />
            <MovieInfo />
            <MoviesContainer />
        </div>
    );
};

export default MainContainer;
