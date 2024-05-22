const Car = require("../models/Car");
const Booking = require('../models/Bookings');

//@desc     Create new car
//@route    POST /api/v1/cars
//@access   Private
exports.createCar = async (req, res, next) => {
    try{
        const car = await Car.create({...req.body, provider: req.user.id});
        res.status(201).json({
            success: true,
            data: car
        })
    } catch(err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

//@desc     Delete single car
//@route    DELETE /api/v1/cars/:id
//@access   Private
exports.deleteCar = async (req, res, next) => {
    //try {
        const car = await Car.findById(req.params.id);

        if (!car) {
            return res.status(404).json({ success: false, message: 'Car not found' });
        }

        // if(req.user.role === 'user' || (car.provider.toString() !== req.user.id && req.user.role === 'provider')) {
        //     return res.status(401).json({
        //       success:false,
        //       message:`User ${req.user.id} is not authorized to delete this car`
        //     });
        // }

        const bookedCar = await Booking.find({ car: req.params.id })
        console.log(bookedCar);
        console.log(bookedCar.length)
        if(bookedCar.length !== 0) {
            return res.status(401).json({
                success:false,
                message:`This car is still booking`
                });
        }

        await car.deleteOne();
        res.status(200).json({ success: true, message: 'Car deleted successfully' });
    // } catch (err) {
    //     console.error("Error deleting car:", err);
    //     // res.status(400).json({ success: false, message: err.message });
    // }
};