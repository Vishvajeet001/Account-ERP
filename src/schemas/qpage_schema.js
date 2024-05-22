const mongoose = require('mongoose');

const quotation_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobno: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    qno: {
        type: Number,
        required: true
    },
    exp: {
        type: Date,
        required: true
    }
});

const qpage_schema = new mongoose.model('quotation_details',quotation_schema);

module.exports = qpage_schema;