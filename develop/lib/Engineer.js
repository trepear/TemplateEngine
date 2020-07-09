const Employee = require("./Employee");


class Engineer extends Employee {
    constructor(name, id, email, github) {
        // using "super" here will take these inputs from parent class (Employee)
        super(name, id, email);
        // github is unique to Engineer, however
        this.github = github;
    }

    getGithub() {
        return this.github;
    }

    getRole() {
        return "Engineer";
    }
}

module.exports = Engineer;