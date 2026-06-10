class Student {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class Admin {
    constructor(username, email, password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

class Candidate {
    constructor(name) {
        this.name = name;
        this.votes = 0;
    }
}

let students = JSON.parse(localStorage.getItem("students")) || [];
let admins = JSON.parse(localStorage.getItem("admins")) || [];
let candidates = JSON.parse(localStorage.getItem("candidates")) || [];
let votes = JSON.parse(localStorage.getItem("votes")) || {};
