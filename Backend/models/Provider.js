const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    citizenCard: {
        type: String,
        required: true
    },
    citizenCertificate: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'rejected' ,'approved'],
        default: 'pending'
    }
    
});

module.exports = mongoose.model('Provider', ProviderSchema);
