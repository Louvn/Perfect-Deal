import Shop from "./shop.js";
import Room from "./room.js";
import Budget from "./budget.js";

const budget = new Budget();

const shop = new Shop(budget, e => {
    room.furnitureBuyed.push(e);
    room.renderAll();
})

await shop.loadOffers();

const room = new Room(shop);
await room.start();