function transformToTilemap(buyed, currentLayerData, groundLayer) { 
    
    let tilemap = [];

    buyed.forEach((name) => {

        const piece = currentLayerData[name] || [];

        // iterate over all y 
        for (let y = 0; y < groundLayer.length; y++) {

            if (!tilemap[y]) tilemap[y] = [];
                
                // iterate over all x
                for (let x = 0; x < groundLayer[y].length; x++) {

                // iterate over all tiles of this piece of furniture
                piece.forEach(e => {
                    if (e[1] === x && e[2] === y) {
                        tilemap[y][x] = e[0];
                    } else if (!tilemap[y][x] && tilemap[y][x] !== 0) {
                        tilemap[y][x] = undefined;
                    }
                })
            }
        }

    });

    return tilemap;
}

export default transformToTilemap;