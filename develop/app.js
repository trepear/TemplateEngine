const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
var employees = [];
const managerQuestions = [
    {
        type: "input",
        name: "managerName",
        message: "Enter the manager's name."
    },
    {
        type: "input",
        name: "managerEmail",
        message: "Enter the manager's email."
    },
    {
        type: "input",
        name: "officeNumber",
        message: "Enter the manager's office number."
    },
    {
        type: "list",
        name: "moreEmployees",
        message: "Do you need to add another employee profile?",
        choices: ["Yes","No"]
    }
]
const employeeQuestions = [
    {
        type: "input",
        name: "employeeName",
        message: "Enter the empoyee's name."
    },
    {
        type: "input",
        name: "employeeEmail",
        message: "Enter the employee's email."
    },
    {
        type: "input",
        name: "gitHub",
        message: "Enter the employee's gitHub username."
    },
    {
        type: "list",
        name: "role",
        message: "What is this employee's title?",
        choices: ["Engineer","Intern"]
    },
    {
        when: input => {
            return input.role === "Intern"
        },
        type: "input",
        name: "schoolName",
        message: "Enter the name of this intern's school." 

    },
    {
        type: "list",
        name: "moreEmployees",
        message: "Do you need to add another employee profile?",
        choices: ["Yes","No"]   
    }
]

// function for prompting questions and pushing profiles into array
function buildList() {
    inquirer.prompt(employeeQuestions).then(response => {
        if (response.role === "Engineer") {
            var addEmployee = new Engineer(response.name, employees.length +1, response.email, response.github)
        } else {
            var addEmployee = new Intern(response.name, employees.length +1, response.email, response.schoolName)
        }
        employees.push(addEmployee);
        if (response.moreEmployees === "Yes") {
            console.log(" ");
            buildList();
        } else {
            render; 
        }
    })
}
buildList();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```