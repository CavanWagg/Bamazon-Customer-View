// Improvements 
// dotenv for mysql password
require('dotenv').config();
const CFonts = require('cfonts');

CFonts.say('BAMAZON', {
  font: '3d',              // define the font face
  align: 'left',              // define text alignment
  colors: ['yellow','magentaBright'],         // define all colors
  background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1,           // define letter spacing
  lineHeight: 1,              // define the line height
  space: true,                // define if the output text should have empty lines on top and on the bottom
  maxLength: '0',             // define how many character can be on one line
});

var mysql = require("mysql");
var inquirer = require('inquirer');
var colors = require('colors/safe');
// database connection 
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // username
  user: "root",

  // password from .env
  password: process.env.MYSQL_PASSWORD,
  // database
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log(colors.rainbow("Hello, welcome to Bamazon!"));
  setTimeout(askName, 1000);
 
});

// ask for name 
function askName() {
  var user = [{
    type: 'input',
    name: 'name',
    message: 'Please enter your name for identification'
  }];

// log name and query inventory
inquirer.prompt(user).then(answers => {
  console.log(`Thank you ${answers.name}, please have a look at our inventory`);
  setTimeout(queryInventory, 500);
})
};


// Display inventory function
function queryInventory() {
  // Select all items from products table and log it in read-friendly format
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(colors.yellow(res[i].item_id) + " | " + colors.cyan(res[i].product_name) + " | " + res[i].department_name + " | " + colors.green("$") + colors.green(res[i].price) + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    setTimeout(promptUserQuestion, 1500);
  })
}


  
  // Please enter the ID of the product you would like to buy
  // Please enter the quantity
  const promptUserQuestion = function() {
    inquirer.prompt([

      { name: "item_id",
            type: "input",
            message: "Please enter the ID # of the product you would like to buy",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          },
            {
              name: "quantity",
            type: "input", 
            message: "Please enter the quantity",
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
            }
    
    ]).then(function(answer) {
      const selectedItem = answer.item_id;
      
      const query = "SELECT * FROM products WHERE ?";
      connection.query(query, { item_id: selectedItem,}, function(err, res) {
        const itemCost = res[0].price;
        // console.log(answer.quantity);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
        
        if (res[0].stock_quantity < answer.quantity) {
          console.log(`I am sorry, we do not have enough ${res[0].product_name} in stock to fulfill your request 
          please check back later or take a look at our other products.`);
         setTimeout(queryInventory, 1500);
        } else {
          let answerQuantity = answer.quantity;
          let updateQuantity = res[0].stock_quantity - answerQuantity;
          let sqlUpdate = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
          connection.query(sqlUpdate, [updateQuantity, answer.item_id], (err, data) => {
            if(err) throw err;
            // console.log(`item updated`);
            setTimeout(calculateTotal, 1000);
            
          });
          
        }
        function calculateTotal() {
            let totalCost = Math.round(answer.quantity * itemCost * 100) / 100; 
            console.log('Your total is ' + colors.green('$') + colors.green(totalCost));
            console.log(colors.rainbow('Thank you for shopping!'));
            inquirer.prompt([
              {
                type: "list",
                name: "shopOrStop",
                message: "Would you like to continue shopping?",
                choices: [colors.green("Yes"), colors.red("No")]
              },
            ]).then(function(user) {
              console.log(user.shopOrStop);
              if (user.shopOrStop === colors.red("No")){
                console.log(colors.rainbow('Have a good day!'));
                process.exit();
              } else {
                queryInventory();
              }
               
              })
            }
        });
        
    })
  }