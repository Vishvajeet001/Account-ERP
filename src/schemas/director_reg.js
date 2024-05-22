const mongoose = require('mongoose');

const director_reg_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    DOB: {
        type: Date,
        required: true
    },
    MOBno: {
        type: Number,
        required: true
    },
    sharePattern: {
        type: String,
        required: true
    },
    education: {
        type: String,
        required: true
    },
    DINno: {
        type: String,
        required: true
    },
    Gender: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    PANno:{
        type: String,
        required: true
    },
    occupation:{
        type: String,
        required: true
    }
});

const director_reg = new mongoose.model('director_reg',director_reg_schema);

module.exports = director_reg;