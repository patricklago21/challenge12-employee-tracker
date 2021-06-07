const mysql = require('mysql2');
const inquirer = require('inquirer');
const table = require('console.table');

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
      case "View all departments":
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

function viewDepartments() {
  db.query(`SELECT * FROM department;`, (err, data) => {
    console.table(data);
    startPrompt();
  });
};

function viewRoles() {
  db.query(`SELECT * FROM role;`, (err, data) => {
    console.table(data);
    startPrompt();
  });
};

function viewEmployees() {
  db.query(`SELECT * FROM employee;`, (err, data) => {
    console.table(data);
    startPrompt();
  });
};

function addDepartment() {
  inquirer.prompt({
    type: "input",
    name: "department",
    message: "What department would you like to add?"
  }).then(function(response) {
    db.query(`INSERT INTO department (name) VALUES (?)`,
    [response.department], (err, data) => {
      if (err) throw err;
      console.log("Successfully created new department!");
      // viewDepartments();
      startPrompt();
    })
  })
}

function addRole() {
  inquirer.prompt([
    {
      message: "What is the role's title?",
      type: "input",
      name: "title"
    },
    {
      message: "What is the role's salary?",
      type: "input",
      name: "salary"
    },
    {
      message: "What is the derpartment ID for the role?",
      type: "number",
      name: "department_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`,
    [response.title, response.salary, response.department_id],
    (err, data) => {
      if (err) throw err;
      console.log("Successfully created new role!");
      // viewRoles();
      startPrompt();
    });
  });
};

function addEmployee() {
  inquirer.prompt([
    {
      message: "What is their first name?",
      type: "input",
      name: "first_name"
    },
    {
      message: "What is their last name?",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is their role ID?",
      type: "number",
      name: "role_id"
    },
    {
      message: "What is their manager ID?",
      type: "input",
      name: "manager_id"
    }
  ]).then(function(response) {
    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`,
    [response.first_name, response.last_name, response.role_id, response.manager_id],
    (err,data) => {
      if (err) throw err;
      console.log("Successfully added a new employee!");
      // viewEmployees();
      startPrompt();
    });
  });
};

function updateRole() {
  inquirer.prompt([
    {
      message: "Which employee's role would you like to update? Please enter their last name:",
      type: "input",
      name: "last_name"
    },
    {
      message: "What is their new role ID?",
      type: "number",
      name: "role_id"
    }
  ]).then(function(response) {
    db.query(`UPDATE employee SET role_id = ? WHERE last_name = ?`, 
    [response.role_id, response.last_name],
    (err, data) => {
      if (err) throw err;
      console.log("Role updated successfully!");
      startPrompt();
    });
  });
};