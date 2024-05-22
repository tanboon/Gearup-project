const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    Brand: {
        type: String,
        required: [true, 'Please specify a brand name'],
        trim: true,
    },
    Model: {
        type: String,
        required: [true, 'Please specify a car model'],
        trim: true,
    },
    Year: {
        type: String,
        required: [true, 'Please specify a year']
    },
    Color: {
        type: String,
        required: [true, 'Please specify a color']
    },
    FeePerDay: {
        type: Number,
        required: [true, 'Please specify a fee per day']
    },
    LicensePlate: {
        type: String,
        required: [true, 'Please specify a license plate number'],
        unique: true
    },
    provider: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    PictureCover: {
        type: String,
        required: [true, 'Please specify a cover picture']
      },
    Picture1: {
        type: String,
        required: false
      },
    Picture2: {
        type: String,
        required: false
      },
    Picture3: {
        type: String,
        required: false
      },
    Picture4: {
        type: String,
        required: false
      },
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

//Cascade delete bookings when a car is deleted
// CarSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
//     console.log(`Bookings being removed from car ${this._id}`);
//     await this.model('Booking').deleteMany({car: this._id});
//     next();
// });

//Reverse populate with virtuals
CarSchema.virtual('bookings', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'car',
    justOne: false
});

module.exports = mongoose.model('Car', CarSchema);
