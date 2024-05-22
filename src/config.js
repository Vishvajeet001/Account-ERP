const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/Auth_Login');

connect.then(() => {
    console.log('Connected to database');
})
.catch(() => {
    console.log('Error connecting to database');
});

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const collection = new mongoose.model('users', LoginSchema);

module.exports = collection;