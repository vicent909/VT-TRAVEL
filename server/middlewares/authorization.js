const { verify } = require('../helpers/jwt');
const { User } = require('../models');

async function authorization(req, res, next){
    try {
        const userId = req.user;

        const user = await User.findByPk(userId);

        if(user.role !== 'Admin'){
            throw { name: 'ForbiddenRequest'}
        }

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authorization;