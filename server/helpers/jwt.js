const jwt = require('jsonwebtoken');
const secret = 'secret'

const token = (payload) => {
    return jwt.sign(payload, secret)
}

const verify = (token) => {
    return jwt.verify(token, secret)
}


module.exports = { token , verify}