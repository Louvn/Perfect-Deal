import Renderer from "./renderer.js";

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

    async displayOffersForItem(itemName) {
        const template = document.getElementById("productTemplate");
        const productsDiv = document.getElementById("productsDiv");

        const offers = this.offers?.[itemName];
        
        for (let idx = 0; idx < offers.length; idx++) {
            
            const productElement = template.content.cloneNode(true);
            const e = offers[idx];

            const canvas = productElement.querySelector("canvas");
            const itemRenderer = new Renderer(canvas);

            await itemRenderer.loadTilesets();
            itemRenderer.furnitureLayer = [[1]]
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