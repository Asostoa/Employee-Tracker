const mysql = require("mysql");
const inquirer = require("inquirer");
const consoleTable = require("console.table");
const promisemysql = require("promise-mysql");
const asciify = require('asciify-image');

//Properties for the Ascii Logo
const options = {
  fit: 'box',
  width: 48,
  height: 48
}
//Funtion that convertes the logo picture into a Ascii art
function nasa() {
  asciify('./assets/nasa.png', options)
    .then(function (asciified) {
      // Print asciified image to console
      console.table(asciified);
    })
    .catch(function (err) {
      // Print error to console
      console.error(err);
    });
}


// Connection Properties
const connectionProperties = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employees_DB"
}

// Creating Connection
const connection = mysql.createConnection(connectionProperties);


// Establishing Connection to database
connection.connect((err) => {
  if (err) throw err;

 
});
// Inquirer prompt and promise
const question = function () {
  inquirer
    .prompt({
      type: "list",
      name: "questionAsk",
      message: "What would you like to do?",
      choices: [
        "View all Astronauts",
        "View all roles",
        "View all departments",
        "Add Astronaut",
        "Add department",
        "Add role",
        "Update Astronaut role",
        "Remove Astronaut",
        "Exit"
      ]
    })
    .then(function (answer) {
     
      // start of switch statment for user choice
      switch (answer.questionAsk) {
        case "View all Astronauts":

          viewallemployees();
          break;

        case "View all roles":
          viewallroles();
          break;

        case "View all departments":
          viewalldepartments();
          break;

        case "Add Astronaut":
          addEmployee();
          break;

        case "Update Astronaut role":
          updateEmpRole();
          break;

        case "Add department":
          addDepartment();
          break;

        case "Add role":
          addRole();
          break;
        case "Remove Astronaut":
          deleteEmploye();
          break;
        case "Exit":
          exit();
          break;
      }
    });
};
nasa();

setTimeout(function () {
  console.log("\n Welcome to the Apollo Program Astronauts Tracker\n")
  question();
}, 700)

// allows user to view all departments currently in the database
function viewalldepartments() {
  connection.query("SELECT * FROM department", function (err, answer) {
    console.log("\n Departments Retrieved from Database \n");
    console.table(answer);
  });
  question();
}

// allows user to view all employee roles currently in the database
function viewallroles() {
  connection.query("SELECT * FROM role", function (err, answer) {
    console.log("\n Roles Retrieved from Database \n");
    console.table(answer);

  });
  question();
}

function viewallidroles() {
  connection.query("SELECT * FROM role", function (err, answer) {
    console.log("\n Roles ID Retrieved from Database  \n");
    console.table(answer);});
  
}


// allows user to view all employees currently in the database
function viewallemployees() {
  console.log("retrieving employess from database");
  var query1 =
    "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  connection.query(query1, function (err, answer) {
    console.log("\n Employees retrieved from Database \n");
    console.table(answer);
  });
  question();
}

// allows user to add a new employee to database
function addEmployee() {
  viewallidroles()
   inquirer
    .prompt([
      {
        type: "input",
        message: "Enter employee first name",
        name: "firstName"
      },
      {
        type: "input",
        message: "Enter employee last name",
        name: "lastName"
      },
      {
        type: "input",
        message: "Enter employee dep ID",
        name: "depID"
      },
      
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (employee.first_name, employee.last_name, role_id) VALUES (?, ?, ?);",
        [
          answer.firstName,
          answer.lastName,
          parseInt(answer.depID),
          
        ],
        function (err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      question();
    });
}


function updateEmpRole() {
  let allemp = [];
  connection.query("SELECT * FROM employee", function (err, answer) {
    // console.log(answer);
    for (let i = 0; i < answer.length; i++) {
      let employeeString =
        answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
      allemp.push(employeeString);
    }
    // console.log(allemp)

    inquirer
      .prompt([
        {
          type: "list",
          name: "updateEmpRole",
          message: "select employee to update role",
          choices: allemp
        },
        {
          type: "list",
          message: "select new role",
          choices: ["manager", "employee"],
          name: "newrole"
        }
      ])
      .then(function (answer) {
        console.log("about to update", answer);
        const idToUpdate = {};
        idToUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
        if (answer.newrole === "manager") {
          idToUpdate.role_id = 1;
        } else if (answer.newrole === "employee") {
          idToUpdate.role_id = 2;
        }
        connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [idToUpdate.role_id, idToUpdate.employeeId],
          function (err, data) {
            question();
          }
        );
      });
  });
}

// allows user to add a new department into the database
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "enter department name",
      name: "dept"
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.dept
        },
        function (err, answer) {
          if (err) {
            throw err;
          }
        }
      ),
        console.table(answer);
      question();
    });
}

// allows user to add a new role/title
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter employee title",
        name: "addtitle"
      },
      {
        type: "input",
        message: "enter employee salary",
        name: "addsalary"
      },
      {
        type: "input",
        message: "enter employee department id",
        name: "addDepId"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.addtitle,
          salary: answer.addsalary,
          department_id: answer.addDepId
        },
        function (err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      question();
    });
}

function deleteEmploye() {

  connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;', function (err, answer) {
    console.log("\n Employees retrieved from Database \n");
    console.table(answer);
  });
  inquirer
    .prompt([
      {
        type: "input",
        message: "enter id name you want to delete",
        name: "id"
      }
    ])
    .then(function (answer) {
      connection.query(
        "DELETE * FROM employee where id = ?", [answer.id],
        function (err, answer) {
          if (err) {
            throw err;
          }
          console.table(answer);
        }
      );
      question();
    });
}

function exit() {
  connection.end();

}
