const mongoose = require('mongoose');

const company_reg_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true
    },
    paidCapital: {
        type: Number,
        required: true
    },
    authorizedCapital: {
        type: Number,
        required: true
    },
    reservation: {
        type: Boolean,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    addressProof: {
        type: String,
        required: true
    }
});

const company_reg = new mongoose.model('company_reg',company_reg_schema);

module.exports = company_reg;