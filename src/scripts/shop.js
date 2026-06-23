import Renderer from "./renderer.js";

class Shop {

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
            const renderer = new Renderer(canvas);

            await renderer.loadTilesets();
            renderer.render();

            productElement.querySelector(".price").textContent = `${e.price}€`;
            productElement.querySelector(".sale").textContent = `-${e.sale}%`;
            productElement.querySelector(".website").textContent = e.website;
            productElement.querySelector(".buy").addEventListener("click", () => this.buyItem(itemName, ));

            productsDiv.appendChild(productElement);
        }
    }

    buyItem(itemName, offerId) {
        
    }
}

export default Shop;