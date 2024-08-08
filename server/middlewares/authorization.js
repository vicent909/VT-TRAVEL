const { verify } = require('../helpers/jwt');
const { User } = require('../models');

async function authorization(req, res, next){
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId);

        if(user.role !== 'Admin'){
            throw { name: 'ForbiddenRequest'}
        }

        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authorization;