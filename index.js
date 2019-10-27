const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require("./config.json");
const inventory = require('./inventoryController.js');

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.route('/category')
    .get(inventory.getAllCategories)
    .post(inventory.addNewCategory);

app.route('/category/:id')
    .get(inventory.getCategoryById)
    .put(inventory.changeCategoryNameById)
    .delete(inventory.deleteCategoryById);

app.route('/area')
    .get(inventory.getAllAreas)
    .post(inventory.addNewArea);

app.route('/area/:id')
    .get(inventory.getAreaById)
    .put(inventory.changeAreaNameById)
    .delete(inventory.deleteAreaById);

app.route('/box')
    .get(inventory.getAllBoxes)
    .post(inventory.addNewBox);

app.route('/box/:id')
    .get(inventory.getBoxById)
    .put(inventory.changeAreaNameForBoxById)
    .delete(inventory.deleteBoxById);

app.route('/box/items/:id')
    .get(inventory.getItemsInBoxById);

app.route ('/box/:id/item/:itemId')
    .put(inventory.addItemToBox)
    .delete(inventory.deleteItemFromBox);

app.route('/item')
    .get(inventory.getAllItems)
    .post(inventory.addNewItem);

app.route('/item/:id')
    .get(inventory.getItemById)
    .put(inventory.changeItemById)
    .delete(inventory.deleteItemById);

app.route('/item/get/name')
    .get(inventory.getItemByName);

app.route('/item/get/category')
    .get(inventory.getItemsByCategory);

app.route('/item/:id/box/:boxId')
    .get(inventory.getItemByIdInBox);

app.listen(config.expressConfig.port, function () {
    console.log('App listening on port ' + config.expressConfig.port);
});