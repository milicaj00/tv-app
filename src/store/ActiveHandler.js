import { makeAutoObservable, toJS } from "mobx";

export class ActiveHandler {
    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
    }

    active = "";
    prevActive = "";

    setActive(newActive) {
        this.active = newActive;
        // this.prevActive = this.active;
        console.log(this.active)
    }

    get keyHandler() {
        return toJS(this.active);
    }
}
