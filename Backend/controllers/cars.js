const Car = require("../models/Car");
const CarRental = require("../models/carRental");
const Booking = require('../models/Bookings');

//@desc     Get all cars
//@route    GET /api/v1/cars
//@access   Public
exports.getCars = async (req, res, next) => {
    try {
        let query;

        //Copy req.query
        const reqQuery = {...req.query};

        //Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        //Loop over remove fields and delete them from reqQuery
        removeFields.forEach(param=>delete reqQuery[param]);
        // console.log(reqQuery);
        
        //Create query string
        let queryStr = JSON.stringify(req.query);

        //Create operator ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in) \b/g, match=>`$${match}`);

        //finding resource
        query = Car.find(JSON.parse(queryStr)).populate('bookings');

        //Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        //Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join('');
            query = query.sort(sortBy);
        } else {
            query = query.sort('name');
        }

        //Pagination
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 25;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const total = await Car.countDocuments(JSON.parse(queryStr));

        query = query.skip(startIndex).limit(limit);
        
        //Executing query
        const car = await query;

        //Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(200).json({
            success: true, 
            count: car.length,
            pagination,
            data: car
        });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
};

//@desc     Get single car
//@route    GET /api/v1/cars/:id
//@access   Public
exports.getCar = async (req, res, next) => {
    try {
        const car = await Car.findById(req.params.id);
        
        if (!car) {
            return res.status(404).json({success: false,message: "The car was not found"});
        }

        res.status(200).json({
            success: true, 
            data: car
        });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
};

//@desc     Get provider car
//@route    GET /api/v1/cars/provider/:id
//@access   Public
exports.getProviderCars = async (req, res, next) => {
    try {
        const car = await Car.find({ provider:req.params.id});

        if (!car || car.length == 0) {
            return res.status(404).json({success: false, message: "The car was not found"});
        }

        res.status(200).json({
            success: true, 
            data: car
        });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
};

// //@desc     Create new car
// //@route    POST /api/v1/cars
// //@access   Private
// exports.createCar = async (req, res, next) => {
//     try{
//         const car = await Car.create({...req.body, provider: req.user.id});
//         res.status(201).json({
//             success: true,
//             data: car
//         })
//     } catch(err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

//@desc     Update single car
//@route    PUT /api/v1/cars/:id
//@access   Private
exports.updateCar = async (req, res, next) => {
    try {
        const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!car) {
            return res.status(404).json({success: false});
        }

        if(req.user.role === 'user' || (car.provider.toString() !== req.user.id && req.user.role === 'provider')) {
            return res.status(401).json({
              success:false,
              message:`User ${req.user.id} is not authorized to update this car`
            })
        }

        res.status(200).json({success: true, data: car});

    } catch(err) {
        console.log(err);
        res.status(500).json({success: false});
    }
};

// //@desc     Delete single car
// //@route    DELETE /api/v1/cars/:id
// //@access   Private
// exports.deleteCar = async (req, res, next) => {
//     try {
//         const car = await Car.findById(req.params.id);

//         if (!car) {
//             return res.status(404).json({ success: false, message: 'Car not found' });
//         }

//         if(req.user.role === 'user' || (car.provider.toString() !== req.user.id && req.user.role === 'provider')) {
//             return res.status(401).json({
//               success:false,
//               message:`User ${req.user.id} is not authorized to delete this car`
//             });
//         }

//         const bookedCar = await Booking.find({ car: req.params.id })
//         console.log(bookedCar);
//         console.log(bookedCar.length)
//         if(bookedCar.length !== 0) {
//             return res.status(401).json({
//                 success:false,
//                 message:`This car is still booking`
//                 });
//         }

//         await car.deleteOne();
//         res.status(200).json({ success: true, message: 'Car deleted successfully' });
//     } catch (err) {
//         console.error("Error deleting car:", err);
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

//@desc Get all car rentals
//@route GET /api/v1/cars/CarRentals
//@access Public
exports.getCarRentals= (req,res,next)=>{
    CarRental.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Car Rentals."
            });
        else res.send(data);
    });
}