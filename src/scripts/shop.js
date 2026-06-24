import Renderer from "./renderer.js";
import transformToTilemap from "./utils/tilemapTransformer.js";

class Shop {

    constructor(budget, onFurnitureBuyed) {
        this.budget = budget;
        this.onFurnitureBuyed = onFurnitureBuyed;
    }

    async loadOffers() {
        const offersFound = await fetch("./offers.json");
        this.offers = await offersFound.json();
        console.log(`loaded offers for ${Object.keys(this.offers).length} products`);
    }

    async displayOffersForItem(itemName, smallItems, furniture, buyed, groundLayer) {
        const template = document.getElementById("productTemplate");
        const productsHeading = document.getElementById("productsHeading");
        const productsDiv = document.getElementById("productsDiv");

        productsDiv.querySelectorAll(".product").forEach(e => e.remove());

        const offers = this.offers?.[itemName];
        productsHeading.textContent = `${offers.length} Offers`;
        
        for (let idx = 0; idx < offers.length; idx++) {
            
            const productElement = template.content.cloneNode(true);
            const e = offers[idx];

            const canvas = productElement.querySelector("canvas");
            const itemRenderer = new Renderer(canvas);

            await itemRenderer.loadTilesets();
            itemRenderer.furnitureLayer = transformToTilemap([...buyed, itemName], furniture, groundLayer);
            itemRenderer.smallItemsLayer = transformToTilemap([...buyed, itemName], smallItems, groundLayer);
            itemRenderer.floorWallsLayer = groundLayer;
            itemRenderer.render();

            productElement.querySelector(".price").textContent = `${e.price}€`;
            productElement.querySelector(".sale").textContent = `-${e.sale}%`;
            productElement.querySelector(".website").textContent = e.website;
            productElement.querySelector(".buy").addEventListener("click", () => this.buyItem(itemName, idx));

            productsDiv.appendChild(productElement);
        }
    }

    buyItem(itemName, offerId) {
        if (!Object.keys(this.offers).includes(itemName)) return;

        const offer = this.offers[itemName][offerId];
        const realPrice = offer.price - (offer.sale / 100) * offer.price;

        this.budget.minus(realPrice);

        this.onFurnitureBuyed(itemName);
    }
}

export default Shop;