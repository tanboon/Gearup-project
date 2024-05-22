const exp = require('constants');
const User = require('../models/User');

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.status(statusCode).cookie('token', token, options).json({
            success: true,
            token
        });
}
// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
    try {
        const { name, tel, email, password, role } = req.body;

        // Create user
        const user = await User.create({
            name,
            tel,
            email,
            password,
            role
        });
        // Create token
        // const token = user.getSignedJwtToken();
        // res.status(201).json({ success: true , token});
        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
        console.log(err.stack);
    }
}

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
    try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
        return res.status(400).json({ success: false, 
            msg: 'Please provide email and password'});
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(401).json({ success: false, msg: 'Invalid credentials'});
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return res.status(401).json({ success: false, msg: 'Invalid credentials'});
    }

    // Create token
    const token = user.getSignedJwtToken();
    res.status(200).json({ success: true, _id: user._id, email: user.email, password: user.password, token });
    // sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(500).json({ success: false, msg: 'Cannot login because of SQL injection'});
    }
}

// @desc    Log user out / clear cookie
// @route   GET /api/v1/auth/logout
// @access  Private
exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({ 
        success: true, 
        data: {},
        msg: 'Successfully logout user account'
    });
}

// @desc    Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({ 
        success: true, 
        data: user 
    });
};