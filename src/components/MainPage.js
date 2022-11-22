import React, { useEffect } from "react";
import MainContainer from "./MainContainer";
import MovieInfo from "./MovieInfo";
import SideMenu from "./SideMenu";
import { provider, useInstance } from "react-ioc";
import { observer } from "mobx-react";
import { ActiveHandler } from "../store/ActiveHandler";

import "../style/MainPage.css";
import { MovieStore } from "../store/MovieStore";
import { ActiveMovieStore } from "../store/ActiveMovie";

const MainPage = provider(
    ActiveHandler,
    MovieStore,
    ActiveMovieStore
)(
    observer(() => {
        const keyHandler = useInstance(ActiveHandler);

        useEffect(() => {
            keyHandler.setActive("SideMenu");
        }, []);

        return (
            <div className="MainPage">
                <SideMenu />
                <MainContainer />
            </div>
        );
    })
);

export default MainPage;
