const mongoose = require('mongoose');

const company_detail_reg_schema = new mongoose.Schema({
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
    objectives: {
        type: String,
        required: true
    }
});

const company_detail_reg = new mongoose.model('company_detail_reg',company_detail_reg_schema);

module.exports = company_detail_reg;