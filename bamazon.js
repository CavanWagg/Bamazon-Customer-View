var mysql = require("mysql");

var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "$Casekeenum7",
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

      { name: "item",
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
              name: "item",
            type: "input", 
            message: "Please enter the quantity",
            }
    
    ]).then(function(answer) {
      const query = "SELECT * FROM products WHERE ?";
      connection.query(query, {item_id: answer.item_id }, function(err, res) {
        
      } )
        
    });
  

  }
  