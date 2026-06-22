import Renderer from "./renderer.js";

class Room {
    constructor() {
        this.renderer = new Renderer();
        this.loadRoom();

        this.start()
    }

    async start() {
        await this.renderer.loadTilesets();
        this.renderAll()
    }

    async loadRoom() {
        const data = await fetch("./room.json");
        const jsonData = await data.json();

        this.room = jsonData.room;
        this.furniture = jsonData.furniture;

        console.log("loaded room");
    }

    renderAll() {
        this.renderer.floorWallsLayer = this.room;

        this.renderer.render()
    }
}

export default Room;