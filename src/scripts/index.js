import Shop from "./shop.js";
import Renderer from "./renderer.js";

const shop = new Shop();

await shop.loadOffers();
shop.displayOffersForItem("chair");

const renderer = new Renderer();

renderer.furnitureLayer = [[1,2,4], [2,3,5]];

setTimeout(() => renderer.render(), 500)
