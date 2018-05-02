DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  -- unique id for each product
  item_id INT NOT NULL AUTO_INCREMENT,
  -- product name
  product_name VARCHAR(100) NOT NULL,
  -- department name
  department_name VARCHAR(30),
  -- Price (cost to customer)
  price DECIMAL(10,2) NULL,
  -- stock_quantity
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Converse Chuck Taylors", "Shoes", 65.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("BPI Sports Micronized Creatine", "Nutrition", 14.36, 32);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Garden of Life Probiotics supplement", "Nutrition", 30.16, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Phillips Norelco Electric Shaver", "Electronics", 43.16, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("ALOHA Organic Plant Based Protein Powder", "Nutrition", 30.78, 2);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("PF Flyers", "Shoes", 59.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Microsoft Sculpt Ergonomic Mouse", "Electronics", 39.90, 12);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Larabar, Peanut Butter Cookie", "Nutrition", 15.99, 19);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Confessions of Saint Augustine", "Books", 14.95, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Mens Tri Blend V-neck Tee Shirt", "Clothing", 11.95, 4);