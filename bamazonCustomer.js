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
        console.table(res);
        console.log("=========================")

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
            type: "input",
            message: "how many would you like to buy",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                } else { return false };
            }
        }
    ]).then(function (buyer) {
        // console.log(buyer.quantity);
        // console.log(buyer.item)
        var select = "SELECT Item_id, product_name, price, stock_quantity FROM products WHERE Item_id =" + (buyer.item);
        connection.query(select, function (err, res) {
            if (err) throw err;
            var avability = (res[0].stock_quantity);
            if (avability < (buyer.quantity)) {
                console.log("Insufficient quantity!");
                connection.end();
                return;
            } else {
                var total = (res[0].stock_quantity) - buyer.quantity;
                var totalPrice = buyer.quantity * (res[0].price);
                var update = "UPDATE products SET stock_quantity=" + total + " WHERE Item_id=" + buyer.item;
                connection.query(update, function (err, res) {
                    if (err) throw err;
                    if (buyer.quantity > 1) {
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
