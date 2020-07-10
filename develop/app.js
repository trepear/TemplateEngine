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
        name: "id",
        message: "Enter manager's ID number."
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
        name: "id",
        message: "Enter employee's ID number."
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
        type: "input",
        name: "gitHub",
        message: "Enter the employee's gitHub username."
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
            var addEmployee = new Engineer(response.employeeName, employees.length +1, response.employeeEmail, response.gitHub)
        } else {
            var addEmployee = new Intern(response.employeeName, employees.length +1, response.employeeEmail, response.schoolName)
        }
        employees.push(addEmployee);
        if (response.moreEmployees === "Yes") {
            console.log(" ");
            buildList();
        } else {
             if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
              }
            fs.writeFile(outputPath, render(employees), function (err){
                if(err) {
                    throw err;
                }
            })
        }
    })
}
// function for initializing the program and prompting first set of questions
function init() {
    inquirer.prompt(managerQuestions).then(response => {
        let teamManager = new Manager(response.managerName, response.id, response.managerEmail, response.officeNumber);
        employees.push(teamManager);
        console.log(" ");
        if(response.moreEmployees === "Yes") {
            buildList()
        } else {
            if (!fs.existsSync(OUTPUT_DIR)) {
                fs.mkdirSync(OUTPUT_DIR)
              }
            fs.writeFile(outputPath, render(employees), function (err) {
                if(err) {
                    throw err
                }

            })
        }
    })
}
init();
