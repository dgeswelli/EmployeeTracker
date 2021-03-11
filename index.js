const mysql = require('mysql');
const inquirer = require("inquirer");


// intial load creates prompts in the form of a list with choices
// what would you like to do
// list of choices.........

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Be sure to update with your own MySQL password!
    password: 'password',
    database: 'employeeDB',
  });
  
  connection.connect((err) => {
    if (err) throw err;
    run();
  });

const run = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View Employees/Departments/Roles',
                'Add Employees/Departments/Roles',
                'Update Employee Roles',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View Employees/Departments/Roles':
                    view();
                    break;

                case 'Add Employees/Departments/Roles':
                    add();
                    break;

                case 'Update Employee Roles':
                    update();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        });
};


const view = () => {
    inquirer.prompt(
        {
            name: "viewChoice",
            type: "list",
            message: "Which would you like to view",
            choices: ["Employees", "Departments", "Roles"],
        })
        .then((answer) => {
            switch (answer.viewChoice) {
                case 'Employees':
                    viewEmployees();
                    break;

                case 'Departments':
                    viewDepartments();
                    break;

                case 'Roles':
                    viewRoles();
                    break;

                default:
                    console.log(`Invalid action: ${answer.viewChoice}`);
                    break;
            }
        });

    const viewEmployees = () => {
        const query = 'SELECT first_name, last_name, role_id, employee_id FROM employeedDB WHERE ?';
        connection.query(query, { Empoyees: answer.employee }, (err, res) => {
            res.forEach(({ first_name, last_name, role_id, employee_id }) => {
                console.log(
                    `Name: ${first_name + " " + last_name} || Role: ${role_id} || Employee ID: ${employee_id}`
                );
            });
        });
    }
}
//depending on what choice was hit run x function use switch

// view all employees (name)
//"viewemployees" (value)

// case viewemployees {}
// return viewAllEmployees()
//}


// const viewAllEmployees()

run();