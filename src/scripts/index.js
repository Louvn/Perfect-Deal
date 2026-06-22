import Shop from "./shop.js";

const shop = new Shop();

await shop.loadOffers();
shop.displayOffersForItem("chair");