const Payment = require("../models/Payment")

//@desc     Get all payments
//@route    GET /api/v1/payments
//@access   Private
exports.getPayments = async (req, res, next) => {
    try {
        let query;

        // Copy req.query
        const reqQuery = { ...req.query };

        // Fields to exclude
        const removeFields = ['select', 'sort', 'page', 'limit'];

        // Loop over remove fields and delete them from reqQuery
        removeFields.forEach((param) => delete reqQuery[param]);
        // console.log(reqQuery);

        // Create query string
        let queryStr = JSON.stringify(req.query);

        // Create operator ($gt, $gte, etc)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in) \b/g, (match) => `$${match}`);

        // Finding resource
        query = Payment.find(JSON.parse(queryStr));

        // Select Fields
        if (req.query.select) {
            const fields = req.query.select.split(',').join(' ');
            query = query.select(fields);
        }

        // Sort
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join('');
            query = query.sort(sortBy);
        } else {
            query = query.sort('name');
        }

        // Executing query
        const payment = await query;

        res.status(200).json({
            success: true,
            count: payment.length,
            data: payment
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


//@desc     Update single car
//@route    PUT /api/v1/payments/:id
//@access   Private
exports.updatePayment = async (req, res, next) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!payment) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, data: payment});

    } catch(err) {
        console.log(err);
        res.status(400).json({success: false});
    }
};

