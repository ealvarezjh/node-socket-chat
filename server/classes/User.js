class User {

    constructor() {
        this.users = [];
    }


    addUser(id, name, room) {

        let user = { id, name, room };

        this.users.push(user);

        return this.users;
    }


    getUser(id) {

        let user = this.users.filter(user => user.id === id)[0];
        return user;
    }


    getUsers() {
        return this.users;
    }


    getUsersByRoom(room) {
        let usersByRoom = this.users.filter(user => user.room === room);
        return usersByRoom;
    }


    deleteUser(id) {

        let userDeleted = this.getUser(id);

        this.users = this.users.filter(user => user.id != id);

        return userDeleted;
    }
}


module.exports = {

    User
}