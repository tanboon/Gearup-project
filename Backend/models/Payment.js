const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    bookingId : {type: String, requried: true},
    userId : {type: String, required:true},
    customerId : {type: String},
    car : {
        _id : {type: String},
        FeePerDay: {type: Number},
        LicensePlate:{type:  String},
        provider: {type: String},
        quantity : {type: Number}
    },
    total : {type: Number, required: true},
    information : {type: Object, required: true},
    status : {type : String, default : "refundable"},
    payment_intent : {type: String, required:true},
    invoiceId : {type: String, required:true},
    payment_status : {type: String, required:true},
    reciept: {type: String, required:true}
},
{timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema);
