require('dotenv').config()
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "bamazon_db"

});

connection.connect(function (err) {
    if (err) throw err;
    query();
});

function query() {
    console.log("=========================")
    console.log("products on Sale");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "=========================" + "\n" +
                "ITEM ID: " + res[i].id + '\n' +
                "PRODUCT NAME: " + res[i].product_name + '\n' +
                "UNIT PRICE: $" + res[i].price + "\n" +
                "UNITS REMAINING: " + res[i].stock_quantity + "\n"
            );
        }
        buyItem();
    });
}
function buyItem() {
    inquirer.prompt([
        {
            name: "item",
            type: "input",
            message: "Enter the ITEM ID of the product to buy it",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else { return false };
            }
        },
        {
            name: "quantity",
            type: "number",
            message: "how many would you like to buy",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else { return false };
            }
        }
    ]).then(function (buyer) {
        var select = "SELECT Item_id, stock_quantity, price, product_name FROM products WHERE Item_id = ?" + (buyer.Item_id);
        connection.query(select, function (err, res) {
            if (err) throw err;
            var avability = (res[0].stock_quantity);
            if (avability < (buyer.quantity)) {
                console.log("Insufficient quantity!");
                connection.end();
                return;
            } else {
                var total = (res[0].stock_quantity) - buyer.quantity;
                var totalPrice = answer.quantity * (res[0].price);
                var update = "UPDATE products SET stock_quantity=" + total + " WHERE Item_id=" + buyer.item;
                connection.query(update, function (err, res) {
                    if (err) throw err;
                    if (answer.quantity > 1) {
                        console.log("You Purchased an Item, THANK YOU")
                    } else {
                        console.log("Item Not Purchased")
                    }
                    console.log("Total Price: $" + totalPrice)
                })
            }
            connection.end();
        })
    })
};
