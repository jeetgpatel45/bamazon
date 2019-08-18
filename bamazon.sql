DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  Item_id INTEGER NOT NULL,
  product_name VARCHAR(80) NOT NULL,
  department_name VARCHAR(80) NOT NULL,
  price DECIMAL(10, 2),
  stock_quantity INTEGER NOT NULL,
  PRIMARY KEY (id);
);

INSERT INTO products (Item_id, product_name, department_name, price, stock_quantity)
VALUES 
(1, "T-shirt", "Clothes", 29.99, 73),
(2, "Men's Joggers", "Clothes", 49.99, 20),
(3, "Dylan Blue", "Perfumes", 89.99, 10),
(4, "Ipad", "Electronics", 199.99, 100),
(5, "PS4", "Electronics", 399.99, 55),
(6, "Bose Bluetooth Speaker", "Electronics", 149.99, 36),
(7, "Baby Seats", "Babies", 199.99, 100),
(8, "Photo Frames", "Home Decor", 49.99, 20),
(9, "Dinning Table", "Furniture", 149.99, 12),
(10, "Entertainment Center", "Furniture", 399.99, 10);


SELECT * FROM products