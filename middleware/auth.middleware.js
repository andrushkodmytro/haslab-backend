const jwt = require('jsonwebtoken')
const config = require('config')

const JWT_SECRET = config.get('JWT_SECRET')

module.exports = (req, res, next) => {
    const { headers, method } = req
    if (method === 'OPTIONS') {
        return next()
    }

    try {
        const token = headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Not authorized' })
        }

        const decoded = jwt.verify(token, JWT_SECRET)

        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({ message: 'Not authorized' })
    }
}
