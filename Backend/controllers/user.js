const User = require("../models/User");


exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })

        if (!user) {
            return res.status(400).json({success: false});
        }

        res.status(200).json({success: true, user: user});

    } catch(err) {
        console.log(err);
        res.status(400).json({success: false});
    }
};