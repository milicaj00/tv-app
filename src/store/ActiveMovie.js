import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";

export class ActiveMovieStore {
    constructor() {
        makeAutoObservable(this);
    }

    activeMovie = "";
    fullMovieInfo = {};

    setActive(newActive) {
        this.activeMovie = newActive;
    }

    get movie() {
        return toJS(this.activeMovie);
    }

    get movieInfo() {
        return toJS(this.fullMovieInfo);
    }

    async getFullMovieInfo() {
        const id = this.activeMovie.stream_id;
        await axios
            .get(
                "http://serv.mediaking.fi:8080/player_api.php?username=fica&password=fica456741&action=get_vod_info&vod_id=" +
                    id
            )
            .then(res => {
                console.log(res.data);
                this.fullMovieInfo = res.data.info;
            });
    }
}
