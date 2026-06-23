import Renderer from "./renderer.js";

class Room {
    constructor() {
        this.renderer = new Renderer();
    }

    async start() {
        await this.loadRoom();
        await this.renderer.loadTilesets();
        this.renderAll()
    }

    async loadRoom() {
        const data = await fetch("./room.json");
        const jsonData = await data.json();

        this.room = jsonData.room;
        this.furniture = jsonData.furniture;
        this.furnitureBuyed = ["bed"];

        console.log("loaded room");
    }

    renderAll() {
        this.renderer.floorWallsLayer = this.room;

        // iterate over all buyed furniture
        this.furnitureBuyed.forEach((name) => {
            const piece = this.furniture[name];

            // iterate over all y 
            for (let y = 0; y < this.renderer.floorWallsLayer.length; y++) {

                this.renderer.furnitureLayer[y] = [];
                
                // iterate over all x
                for (let x = 0; x < this.renderer.floorWallsLayer[y].length; x++) {

                    // iterate over all tiles of this piece of furniture
                    piece.forEach(e => {
                        if (e[1] === x && e[2] === y) {
                            this.renderer.furnitureLayer[y][x] = e[0];
                        } else if (!this.renderer.furnitureLayer[y][x] && this.renderer.furnitureLayer[y][x] !== 0) {
                            this.renderer.furnitureLayer[y][x] = undefined;
                        }
                    })
                }
            }

        });

        this.renderer.render();
    }
}

export default Room;