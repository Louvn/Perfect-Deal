import Renderer from "./renderer.js";

class Room {
    constructor(shop) {
        this.renderer = new Renderer();
        this.shop = shop;
    }

    async start() {
        await this.loadRoom();
        await this.renderer.loadTilesets();
        this.renderAll()
        this.showPlusIcons();
    }

    async loadRoom() {
        const data = await fetch("./room.json");
        const jsonData = await data.json();

        this.room = jsonData.room;
        this.furniture = jsonData.furniture;
        this.smallItems = jsonData.smallItems;
        this.furnitureBuyed = [];

        console.log("loaded room");
    }

    renderAll() {
        this.showPlusIcons();

        this.renderer.floorWallsLayer = this.room;

        // -- TODO: create function to reuse for small items

        // iterate over all buyed furniture
        this.furnitureBuyed.forEach((name) => {
            const piece = this.furniture[name];

            // iterate over all y 
            for (let y = 0; y < this.renderer.floorWallsLayer.length; y++) {

                if (!this.renderer.furnitureLayer[y]) this.renderer.furnitureLayer[y] = [];
                
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

    showPlusIcons() {

        const template = document.getElementById("plusTemplate");
        const div = document.querySelector(".canvas-container");

        div.querySelectorAll("button.plusIcon").forEach(e => e.remove());

        for (let [name, data] of Object.entries(this.furniture)) {

            if (this.furnitureBuyed.includes(name)) continue;

            const el = template.content.cloneNode(true).querySelector("button");

            el.addEventListener("click", () => this.shop.displayOffersForItem(name));
            el.classList.add("plusIcon");

            const scaleFactor = this.renderer.canvas.getBoundingClientRect().width / this.renderer.canvas.width;
            const realTileSize = scaleFactor * this.renderer.tileSize;

            el.style.top = `${data[0][2] * realTileSize}px`;
            el.style.left = `${data[0][1] * realTileSize}px`;

            div.appendChild(el);
        }
    }
}

export default Room;