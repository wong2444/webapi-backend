const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        req.
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }

}