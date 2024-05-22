const Provider = require("../models/Provider");

//@desc   Get all Providers
//@route  GET /api/v1/providers
//@access Public
exports.getProviders = async (req, res, next) => {
    let query;

    //Copy req.query
    const reqQuery = {...req.query};

    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Loop over remove fields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);
    console.log(reqQuery);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    query = Provider.find(JSON.parse(queryStr))

    //Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('name');
    }
    
    //Pagination
    const page = parseInt(req.query.page,10) || 1;
    const limit = parseInt(req.query.limit,10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    try {
        const total = await Provider.countDocuments();

        query = query.skip(startIndex).limit(limit);

        //Execute query
        const providers = await query;

        //Pagination result
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            }
        }

        if(startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            }
        }

        res.status(200).json({
            success: true, 
            count: providers.length, 
            data: providers
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

//@desc Get peding providers
//@route GET /api/v1/providers/pending
//@access Private
exports.getPendingProviders = async (req, res, next) => {
    try {
        const pendingProviders = await Provider.find({ status: 'pending' });

        res.status(200).json({
            success: true,
            count: pendingProviders.length,
            data: pendingProviders
        });
    } catch (err) {
        console.error(err.stack);

        return res.status(500).json({
            success: false,
            message: 'Cannot find pending Providers'
        });
    }
};

//@desc Get approved providers
//@route GET /api/v1/providers/approved
//@access Private
exports.getApprovedProviders = async (req, res, next) => {
    try {
        const approvedProviders = await Provider.find({ status: 'approved' });

        res.status(200).json({
            success: true,
            count: approvedProviders.length,
            data: approvedProviders
        });
    } catch (err) {
        console.error(err.stack);

        return res.status(500).json({
            success: false,
            message: 'Cannot find approved Providers'
        });
    }
};

//@desc     Add Provider
//@route    POST /api/v1/providers/
//@access   Private
exports.addProvider = async (req, res, next) => {
    try{
        req.body.user = req.user.id;
        const provider = await Provider.create({...req.body});
        res.status(201).json({
            success: true,
            data: provider
        });
    } catch(err) {
        res.status(500).json({success: false, message: err.message});
    }
};

//@desc   Update single providers
//@route  PUT /api/v1/providers/:id
//@access Private
exports.updateProvider = async (req, res, next) => {
    try {

        let provider = await Provider.findById(req.params.id)
        
        console.log(provider);
        if (!provider) {
            return res.status(404).json({success: false, message: "The provider was not found"});
        }

        if (req.user.role !== 'admin' && req.body.status !== undefined) {
            return res.status(401).json({
                success: false,
                message: 'Users are not authorized to update the status field'
            });
        }

        if(req.user.role === 'user' && (provider.user.toString() !== req.user.id)) {
            return res.status(401).json({
              success:false,
              message:`User ${req.user.id} is not authorized to update this provider's information`
            })
        }
        
        provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });


        res.status(200).json({
            success: true,
            data: provider
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

//@desc   Delete single provide
//@route  DELETE /api/v1/providers/:id
//@access Private
exports.deleteProvider = async (req, res, next) => {
    try {
        const provider = await Provider.findById(req.params.id);

        if (!provider) {
            return res.status(404).json({success: false, message: "The provider was not found"});
        }

        if(req.user.role === 'user' && (provider.user.toString() !== req.user.id)) {
            return res.status(401).json({
              success:false,
              message:`User ${req.user.id} is not authorized to delete this provider's information`
            })
        }

        await provider.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (err) {
        res.status(500).json({success: false, message: err.message});
    }
}

