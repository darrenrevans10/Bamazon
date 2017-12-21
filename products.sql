
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(100) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INTEGER(10) NULL,
    PRIMARY KEY (item_id)
);

SELECT * FROM products;

USE bamazon;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avocado", "Produce", 2.50, 50), ("Milk", "Diary", 3.25 , 100), ("Cereal", "Dry Foods", 5.99 , 30), ("Bread", "Dry Foods", 4.25, 40), ("Banana", "Produce", 0.99, 200), ("Ground Beef", "Meat", 5.99, 30), ("Chicken Breast", "Meat", 6.75, 50), ("Ham", "Deli", 2.99, 20), ("Potato", "Produce", 5.50, 20), ("Pasta", "Dry Foods", 1.25, 100);
SELECT * FROM products; 