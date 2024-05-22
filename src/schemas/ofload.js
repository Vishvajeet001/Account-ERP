const mongoose = require('mongoose');

const ofload_schema = new mongoose.Schema({
    other: {
        type: String,
        required: true
    },
    DLNOC: {
        type: String,
        required: true
    },
    ULNOC: {
        type: String,
        required: true
    }
});

const ofload = new mongoose.model('other_file_upload',ofload_schema);

module.exports = ofload;