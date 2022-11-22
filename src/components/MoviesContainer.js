import { observer } from "mobx-react";
import React, { useState } from "react";
import { useInstance } from "react-ioc";
import { MovieStore } from "../store/MovieStore";
import HorisontalList from "./HorisontalList";
import { ActiveMovieStore } from "../store/ActiveMovie";
import "../style/moviesContainer.css";

const MoviesContainer = () => {
    const movieStore = useInstance(MovieStore);
    const activeMovie = useInstance(ActiveMovieStore);

    const [activeList, setActiveList] = useState(0);

    if (!movieStore.loading) {
        activeMovie.setActive(
            movieStore.movies[movieStore.categories[0]?.category_id]?.[0]
        );

        return (
            <div className="MoviesContainer">
                <div
                    style={{ transform: `translateY(-${activeList * 393}px)` }}
                >
                    {movieStore.categories.map((c, i) => (
                        <div
                            key={c.category_id}
                            className="movie-list-container"
                        >
                            <h1>{c.category_name}</h1>
                            <HorisontalList
                                data={movieStore.movies[c.category_id].slice(0,20)}
                                isActive={activeList == i}
                                setNextActive={setActiveList}
                                myIndex={i}
                                lastIndex={
                                    movieStore.categories.length - 1 == i
                                }
                                staticIndex={3}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};

export default observer(MoviesContainer);
