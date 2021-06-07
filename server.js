const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'lagoland',
      database: 'employees'
    },
    console.log('Connected to the election database.')
);

db.connect(function (err) {
  if (err) throw err;
  console.log('Welcome to your employee manager!');
  startPrompt();
});

function startPrompt() {
  inquirer.prompt({
    message: "Please select an option to get started:",
    type: "list",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit"
    ], 
    name: "choice"
  }).then(answers => {
    switch (answers.choice) {
      case "View all deparments":
        viewDepartments()
        break;
      case "View all roles":
        viewRoles()
        break;
      case "View all employees":
        viewEmployees()
        break;
      case "Add a department":
        addDepartment()
        break;
      case "Add a role":
        addRole()
        break;
      case "Add an employee":
        addEmployee()
        break;
      case "Update an employee role":
        updateRole()
        break;
    };
  });
};