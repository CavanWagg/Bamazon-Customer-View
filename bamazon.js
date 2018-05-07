// Improvements 
// Add timers for better User experience

require('dotenv').config();

const keys = require('./key.js');

var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: mysql.password,
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Hello welcome to bamazon");
  askName();
 
});
// ask for name 
function askName() {
  var user = [{
    type: 'input',
    name: 'name',
    message: 'Please enter your name for identification'
  }];


inquirer.prompt(user).then(answers => {
  console.log(`Thank you ${answers.name}, please have a look at our inventory`);
  queryInventory();
})
};


// return name then display inventory
function queryInventory() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
    }
    console.log("-----------------------------------");
    promptUserQuestion();
  })
}

 // prompt user with 2 message

  // Please enter the ID of the product you would like to buy
  // Please enter the quantity
  const promptUserQuestion = function() {
    inquirer.prompt([/* Pass your questions in here */

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
        console.log(answer.quantity);
        
        if (res[0].stock_quantity < answer.quantity) {
          console.log(`I am sorry, we do not have enough ${res[0].product_name} in stock to fulfill your request 
          please check back later or take a look at our other products.`);
          queryInventory();
        } else {
          let answerQuantity = answer.quantity;
          let updateQuantity = res[0].stock_quantity - answerQuantity;
          let sqlUpdate = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
          connection.query(sqlUpdate, [updateQuantity, answer.item_id], (err, data) => {
            if(err) throw err;
            console.log(`item updated`);
            calculateTotal();
            
          });
          
        }
        function calculateTotal() {
            let totalCost = Math.round(answer.quantity * itemCost * 100) / 100; 
            console.log(`Your total is $${totalCost}`);
            console.log(`Thank you for shopping`);
            // promp, see inventory, or exit;
        }

        
        });
        
    });
  

  }