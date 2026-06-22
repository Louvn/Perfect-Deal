import Shop from "./shop.js";
import Room from "./room.js";

const shop = new Shop();

await shop.loadOffers();
shop.displayOffersForItem("chair");

const room = new Room();
setTimeout(() => room.renderAll(), 500);