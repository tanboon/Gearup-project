const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    bookingDateFrom: {
        type: Date,
        required: true
    },
    bookingDateTo: {
        type: Date,
        required: true
    },
    user : {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    car : {
        type: mongoose.Schema.ObjectId,
        ref: 'Car',
        required: true
    },
    provider:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);