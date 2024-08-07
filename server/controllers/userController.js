const { compare } = require('../helpers/bcrypt')
const { token, verify } = require('../helpers/jwt')
const { User, UserProfile, UserTravel, Travel } = require('../models')

class userController{
    static async getUsers(req, res, next){
        try {
            const data = await User.findAll({
                attributes: {
                    exclude: ['password']
                }, 
                include: [{
                    model: Travel
                },{
                    model: UserProfile
                }]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    } 

    static async getUserById(req, res, next){
        const { id } = req.params;
        try {
            const data = await User.findOne({
                where: { id }, 
                include: [{
                    model: Travel
                },{
                    model: UserProfile
                }]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async register(req, res, next){
        const { email, password } =req.body;
        try {
            const data = await User.create({ email, password, role: 'user' });

            const access_token = token({
                id: data.id
            });

            res.status(201).json({
                userId: data.id,
                access_token: access_token,
                role: data.role
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async login(req, res, next){
        const { email, password } =req.body;
        try {
            const data = await User.findOne({ where: { email } })

            if(!data) throw { name: 'EmailNotFound' };

            const isValidPassword = await compare(password, data.password);

            if(!isValidPassword) throw { name: 'PasswordInvalid' };

            const access_token = token({
                id: data.id
            });

            res.status(200).json({
                userId: data.id,
                access_token: access_token,
                role: data.role
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async addUserProfile(req, res, next){
        const { id } = req.params;
        const { name, phone, address } = req.body;
        try {
            const data = await UserProfile.create({ UserId: id, name, phone, address });

            res.status(201).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getUserProfile(req, res, next){
        const { id } = req.params;
        try {
            const data = await UserProfile.findOne({where: {UserId: id}});

            res.status(200).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async editUserProfile(req, res, next){
        const { id } = req.params;
        const { name, phone, address } = req.body;
        try {
            const data = await UserProfile.findOne({where: {UserId: id}});

            if(!data) throw { name: 'NotFound' };

            data.update({ name, phone, address });

            res.status(200).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}

module.exports = userController;