// Определение класса User
class User {
    constructor(id, firstName, lastName, username, email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.createdAt = new Date();
    }

    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    printInfo() {
        console.log(`ID: ${this.id} Пользователь: ${this.getFullName()} (Username: ${this.username}, Email: ${this.email})`);
    }
}

// Экспортируем класс через module.exports
module.exports = User;