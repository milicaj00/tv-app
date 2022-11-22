import axios from "axios";
import { makeAutoObservable, toJS } from "mobx";

export class MovieStore {
    constructor() {
        makeAutoObservable(this);
        this.readCategories();
        // this.readMovies();
    }

    categories = [];
    movies = {};
    loading = false;

    async readCategories() {
        this.loading = true;
        await axios
            .get(
                "http://serv.mediaking.fi:8080/player_api.php?username=fica&password=fica456741&action=get_vod_categories"
            )
            .then(res => {
                console.log(res.data);
                this.categories = res.data;
                res.data.forEach(c => {
                    this.movies[c.category_id] = new Array();
                });
                this.readMovies();
            });
    }

    async readMovies() {
        await axios
            .get(
                "http://serv.mediaking.fi:8080/player_api.php?username=fica&password=fica456741&action=get_vod_streams"
            )
            .then(res => {
                console.log(res.data);
                res.data.forEach(element => {
                    this.movies[element.category_id]?.push(element);
                });
                //console.log(this.movies)
            });

        this.loading = false;
    }
}
