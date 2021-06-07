const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection(
    {
      host: 'localhost',
      port: 3001,
      user: 'root',
      password: 'lagoland',
      database: 'election'
    },
    console.log('Connected to the election database.')
);