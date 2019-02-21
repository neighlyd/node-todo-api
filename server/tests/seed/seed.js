const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('../../models/todo');
const {User, secretKey} = require('../../models/user');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 999
}];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
    _id: userOneId,
    email: 'dustin@example.com',
    password: 'hunter21',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, secretKey).toString()
    }]
}, {
    _id: userTwoId,
    email: 'natasha@example.com',
    password: 'notSecurePassword'
}];

const populateTodos = (done) => {
    // The Udemy course uses db.remove({}), but this is deprecated; so we use db.deleteMany();
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
};

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        let userOne = new User(users[0]).save();
        let userTwo = new User(users[1]).save();

        // Promise.all([n]) waits until ALL n promises are resolved to trigger callbacks.
        Promise.all([userOne, userTwo])
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
