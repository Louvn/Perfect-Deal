import Renderer from "./renderer.js";
import transformToTilemap from "./utils/tilemapTransformer.js";

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

        this.renderer.furnitureLayer = transformToTilemap(this.furnitureBuyed, this.furniture, this.room);
        this.renderer.smallItemsLayer = transformToTilemap(this.furnitureBuyed, this.smallItems, this.room)

        this.renderer.render();

        if (this.furnitureBuyed.length === Object.keys(this.shop.offers).length) location.href = `./win.html?money=${this.shop.budget.moneyLeft}`;
    }

    showPlusIconsFor(entries, smallItems = false) {

        const template = document.getElementById("plusTemplate");
        const div = document.querySelector(".canvas-container");

        for (let [name, data] of entries) {

            if (this.furnitureBuyed.includes(name)) continue;

            const el = template.content.cloneNode(true).querySelector("button");

            el.addEventListener("click", () => this.shop.displayOffersForItem(name, this.smallItems, this.furniture, this.furnitureBuyed, this.renderer.floorWallsLayer));
            el.classList.add("plusIcon");

            const scaleFactor = this.renderer.canvas.getBoundingClientRect().width / this.renderer.canvas.width;
            const realTileSize = scaleFactor * this.renderer.tileSize;

            el.style.top = `${data[data.length-1][2] * realTileSize}px`;
            el.style.left = `${data[data.length-1][1] * realTileSize}px`;

            div.appendChild(el);
        }
    }

    showPlusIcons() {
        const div = document.querySelector(".canvas-container");
        div.querySelectorAll("button.plusIcon").forEach(e => e.remove());

        this.showPlusIconsFor(Object.entries(this.furniture));

        if (this.furnitureBuyed.length >= Object.keys(this.furniture).length) {
            this.showPlusIconsFor(Object.entries(this.smallItems));
        }
    }
}

export default Room;