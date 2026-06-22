class Renderer {
    constructor() {
        this.loadTilesets();

        this.canvas = document.getElementById("roomCanvas");
        this.tileSize = 16;
        
        this.floorWallsLayer = [];
        this.furnitureLayer = [];
    }

    loadTilesets() {
        this.floorWallsTileset = new Image();
        this.floorWallsTileset.src = "./assets/floors-walls02.png";
        
        this.furnitureTileset = new Image();
        this.furnitureTileset.src = "./assets/furniture03.png";

        this.smallItemsTileset = new Image();
        this.smallItemsTileset.src = "./assets/small-items02.png";
    }

    render() {
        const ctx = this.canvas.getContext("2d");

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const layer of [this.floorWallsLayer, this.furnitureLayer]) {

            const tilemap = layer;

            let tileset;
            switch (layer) {
                case this.floorWallsLayer:
                    tileset = this.floorWallsTileset;
                    break;
                case this.furnitureLayer:
                    tileset = this.furnitureTileset;
                    break; // always break!
            }

            const columns = tileset.width / this.tileSize;

            for (let y = 0; y < tilemap.length; y++) {
                for (let x = 0; x < tilemap[y].length; x++) {

                    const tileId = tilemap[y][x];

                    ctx.drawImage(
                        tileset,

                        // position in tileset
                        (tileId % columns) * this.tileSize,
                        Math.floor(tileId / columns) * this.tileSize,
                        this.tileSize,
                        this.tileSize,

                        // position in canvas
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    )
                }
            }
        }

    }
}

export default Renderer;