const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, 'secret')
        console.log(req.headers)
        console.log(token)
        console.log(decoded)
        req.userData = decoded
        next()
    } catch (error) {
        console.log(req.headers.authorization)
        console.log(req.body)
        console.log(req.hostname)
        return res.status(401).json({
            message: 'auth fail',
            token: 'dddd',
            req: req.body.title

        })
    }

}