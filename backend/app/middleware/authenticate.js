const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader){
        return res.status(401).json({error:"Token not provided!"});
    }

    // Support both "Bearer <token>" and raw token formats
    const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        
        next();
    } catch (error) {
        return res.status(403).json({error: "Invalid or expired token", details: error.message});
    }
};

module.exports = authenticate;