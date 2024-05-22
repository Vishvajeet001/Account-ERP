const mongoose = require('mongoose');

const dfload_schema = new mongoose.Schema({
    PAN: {
        type: String,
        required: true
    },
    Passport: {
        type: String,
        required: true
    },
    DrLic: {
        type: String,
        required: true
    },
    VotingCard: {
        type: String,
        required: true
    },
    bankHistory: {
        type: String,
        required: true
    },
    LightBill: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    sign: {
        type: String,
        required: true
    }
});

const dfload = new mongoose.model('director_file_upload',dfload_schema);

module.exports = dfload;