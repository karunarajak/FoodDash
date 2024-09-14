const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
    let token;

    // Check if the authorization header contains a token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        // Extract token from the "Bearer <token>" format
        token = req.headers.authorization.split(' ')[1];
    }

    // If there's no token in the request
    if (!token) {
        return res.status(401).json({ msg: 'Not authorized, no token provided' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure JWT_SECRET is set in your environment

        // Find the user by the ID in the decoded token
        req.user = await User.findById(decoded.id);

        // If the user doesn't exist
        if (!req.user) {
            return res.status(404).json({ msg: 'No user found with this token' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('JWT Verification Error: ', error);
        return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
};
