const { compare } = require('../helpers/bcrypt')
const { token, verify } = require('../helpers/jwt')
const { User, UserProfile, UserTravel, Travel } = require('../models');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

class userController {
    static async getUsers(req, res, next) {
        try {
            const data = await User.findAll({
                attributes: {
                    exclude: ['password']
                },
                include: [{
                    model: Travel
                }, {
                    model: UserProfile
                }]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getUserById(req, res, next) {
        const { id } = req.params;
        try {
            const data = await User.findOne({
                where: { id },
                include: [{
                    model: Travel
                }, {
                    model: UserProfile
                }]
            })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async register(req, res, next) {
        const { email, password } = req.body;
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

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const data = await User.findOne({ where: { email } })

            if (!data) throw { name: 'EmailNotFound' };

            const isValidPassword = await compare(password, data.password);

            if (!isValidPassword) throw { name: 'PasswordInvalid' };

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

    static async googleLogin(req, res, next) {
        const { googleToken } = req.body;
        try {
            if (!googleToken) throw { name: 'googleLOginFail' };

            const ticket = await client.verifyIdToken({
                idToken: googleToken,
                audience: "1086145307745-8jmgqbbr2hn6cb3ngub2k1di52qirr1t.apps.googleusercontent.com",  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const { email } = ticket.getPayload();
            // const userid = payload['sub'];
            // If the request specified a Google Workspace domain:
            // const domain = payload['hd'];
            // console.log(payload)
            const [user, create] = await User.findOrCreate({
                where: { email: email },
                defaults: {
                    email: email,
                    password: Date.now().toString(),
                    role: 'user'
                }
            })

            const access_token = token({
                id: user.id
            });

            if (create === true) {
                res.status(201).json({
                    userId: user.id,
                    access_token: access_token,
                    role: user.role,
                    create: true
                })
            }else{
                res.status(200).json({
                    userId: user.id,
                    access_token: access_token,
                    role: user.role
                })
            }
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async addUserProfile(req, res, next) {
        const { id } = req.params;
        const { name, phone, address } = req.body;
        try {
            const data = await UserProfile.create({ UserId: req.user.id, name, phone, address });

            res.status(201).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getUserProfile(req, res, next) {
        const { id } = req.params;
        try {
            const data = await UserProfile.findOne({ where: { UserId: id } });

            res.status(200).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async editUserProfile(req, res, next) {
        const { id } = req.params;
        const { name, phone, address } = req.body;
        try {
            const data = await UserProfile.findOne({ where: { UserId: id } });

            if (!data) throw { name: 'NotFound' };

            data.update({ name, phone, address });

            res.status(200).json(data);
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}

module.exports = userController;