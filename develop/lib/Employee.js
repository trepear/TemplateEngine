class Employee {
    constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
}

// Method for getting name
getName() {
    return this.name;
}
// Method for getting id
getId() {
    return this.id;
}

// Method for getting email
getEmail() {
    return this.email;
}

// Method for getting role
getRole() {
    return "Employee";
}
}

module.exports = Employee
