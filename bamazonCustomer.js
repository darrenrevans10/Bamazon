var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Beach4Skim",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  listProducts();
});

function listProducts() {
	var query = "SELECT * FROM products";
	connection.query(query, function (err, res) {
		console.log("\n----------------------------------\n");
		for (var i = 0; i < res.length; i++) {
			console.log(
				"Id: " + 
				res[i].item_id +
				" | Product: " +
				res[i].product_name +
				" | Price: $" +
				res[i].price
			);
		}
		console.log("\n----------------------------------\n");
		wantedProduct();
	});
};


function wantedProduct() {
	inquirer
		.prompt([
			{
				name: "id",
				type: "input",
				message: "Insert the Id of the product you would like to buy"
			}, {
				name: "amount",
				type: "input",
				message: "How many units of the product would you like to buy?"
			}
		]).then(function(answer) {
			var item = answer.id;
			var quantity = answer.amount;

			var query = "SELECT * FROM products WHERE ?";
			connection.query(query, {item_id: item}, function(err, res) {
				if (err) throw err;

				if (res.length === 0) {
					console.log("Invalid Item Id. Please try again");
					listProducts();
				} else {
					
					var product = res[0];
					if (quantity <= product.stock_quantity) {
						var updateQuery = "UPDATE products SET stock_quantity = " + (product.stock_quantity - quantity) + " WHERE item_id = " + item;
						connection.query(updateQuery, function(err, res) {
							if (err) throw err;

							console.log("Your order has been placed");
							console.log("Your total is $" + product.price * quantity);
							listProducts();
						});
					} else {
						
						console.log("Sorry, we do not have enough product in stock");
						listProducts();
					}
				}
			});
		});
};