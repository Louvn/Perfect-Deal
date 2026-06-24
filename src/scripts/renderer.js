class Renderer {
    constructor(canvas = document.getElementById("roomCanvas")) {

        this.canvas = canvas;
        this.tileSize = 16;
        
        this.floorWallsLayer = [];
        this.furnitureLayer = [];
        this.smallItemsLayer = [];

    }

    async loadTilesets() {

        const loadTileset = (src) => new Promise((resolve) => {

            const tileset = new Image();
            tileset.src = src;

            tileset.onload = () => resolve(tileset);
        });

        [this.floorWallsTileset, this.furnitureTileset, this.smallItemsTileset] = await Promise.all([
            loadTileset("./assets/floors-walls02.png"),
            loadTileset("./assets/furniture03.png"),
            loadTileset("./assets/small-items02.png")
        ]);

    }

    render() {
        this.resize();
        const ctx = this.canvas.getContext("2d");

        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (const layer of [this.floorWallsLayer, this.furnitureLayer, this.smallItemsLayer]) {

            const tilemap = layer;

            let tileset;
            switch (layer) {
                case this.floorWallsLayer:
                    tileset = this.floorWallsTileset;
                    break;
                case this.furnitureLayer:
                    tileset = this.furnitureTileset;
                    break; // always break!
                case this.smallItemsLayer:
                    tileset = this.smallItemsTileset;
                    break;
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

    resize() {
        this.canvas.width = (this.floorWallsLayer.length + 1) * this.tileSize;
        this.canvas.height = (this.floorWallsLayer[0].length - 1) * this.tileSize;
    }
}

export default Renderer;