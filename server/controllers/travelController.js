const { Op, where } = require('sequelize');
const { Travel, User, UserTravel, Image, Category, sequelize, UserProfile } = require('../models');
const { v2: cloudinary } = require('cloudinary');
const { now } = require('sequelize/lib/utils');
const midtransClient = require('midtrans-client');
const { OpenAI } = require('openai')

cloudinary.config({
    cloud_name: "diymv0tqb",
    api_key: "428231918617181",
    api_secret: "o8efN9jnCZcxy3HI2bk3X-ABLN8"
})

class travelController {
    static async getTravel(req, res, next) {
        const { categoryId, page, search } = req.query;
        try {
            const options = {
                include: [{
                    model: Image
                }, {
                    model: Category,
                    where: categoryId ? { id: categoryId } : {}
                }, {
                    model: User
                }],
                where: search ? { destination: { [Op.iLike]: `%${search}%` }, deletedAt: null } : { deletedAt: null }
            }

            if (page) {
                if (page.limit) {
                    options.limit = page.limit
                }
                if (page.offset) {
                    options.offset = page.offset
                }
            }

            const data = await Travel.findAndCountAll(options);

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getTravelById(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Travel.findByPk(id, {
                include: [{
                    model: Image
                }, {
                    model: User,
                    include: [
                        {
                            model: UserProfile
                        }
                    ]
                }]
            });

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getRandomTravel(req, res, next) {
        const { categoryId, page, search } = req.query;
        try {
            const options = {
                include: [{
                    model: Image
                }, {
                    model: Category,
                    where: categoryId ? { id: categoryId } : {}
                }],
                where: search ? { destination: { [Op.iLike]: `%${search}%` } } : {},
                order: sequelize.random()
            }

            if (page) {
                if (page.limit) {
                    options.limit = page.limit
                }
                if (page.offset) {
                    options.offset = page.offset
                }
            }

            const data = await Travel.findAndCountAll(options);

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async addTravel(req, res, next) {
        const { destination, description, price, capacity, CategoryId } = req.body;
        try {
            const data = await Travel.create({ destination, description, price, capacity, CategoryId });

            res.status(201).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async deleteTravel(req, res, next) {
        const { id } = req.params;
        try {
            console.log('aaa')
            const data = await Travel.findByPk(id);

            if (!data) throw { name: 'NotFound' };
            // console.log(new Date())
            data.update({ deletedAt: new Date() });

            res.status(200).json({
                message: 'Travel has been deleted'
            })
        } catch (error) {
            next(error)
            console.log(error)
            console.log('aaa')

        }
    }


    static async addImageTravel(req, res, next) {
        const { id } = req.params;
        try {
            const travel = await Travel.findByPk(id);

            if (!travel) throw { name: 'NotFound' };

            const file = req.file;
            const base64 = file.buffer.toString("base64");

            const result = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${base64}`
            );

            const upload = await Image.create({ TravelId: id, imageUrl: result.secure_url })

            res.status(200).json({ imageUrl: result.secure_url });
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getImage(req, res, next) {
        const { id } = req.params;
        try {
            const data = await Image.findOne({ where: { TravelId: id } });

            if (!data) throw { name: 'NotFound' }

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async editTravel(req, res, next) {
        const { id } = req.params;
        const { destination, description, price, capacity } = req.body;
        try {
            const data = await Travel.findByPk(id);

            if (!data) throw { name: 'NotFound' }

            data.update({ destination, description, price, capacity })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async joinTravel(req, res, next) {
        const { id } = req.params;
        try {
            const travel = await Travel.findByPk(id, {
                include: [{
                    model: User
                }]
            });

            if (!travel) throw { name: 'NotFound' }

            if (travel.Users.length === travel.capacity) throw { name: 'TravelFull' };

            const userId = req.user.id;

            const user = await User.findByPk(userId);

            if (!user) throw { name: 'NotFound' }

            const data = await UserTravel.create({ UserId: user.id, TravelId: id });

            res.status(201).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async deleteUserTravel(req, res, next) {
        const { id } = req.params;
        try {
            const userTravel = await UserTravel.findByPk(id);

            if (!userTravel) throw { name: 'NotFound' }

            userTravel.destroy();

            res.status(200).json({
                message: 'Booking travel has been deleted'
            })
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getUserTravel(req, res, next) {
        try {
            const data = await UserTravel.findAll();

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getCategories(req, res, next) {
        try {
            const data = await Category.findAll();

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async generateMidtransToken(req, res, next) {
        const { id } = req.params
        try {
            const travel = await Travel.findByPk(id);
            if (!travel) throw { name: 'NotFound' }
            const user = await User.findByPk(req.user.id)
            if (!user) throw { name: 'NotFound' }

            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: 'SB-Mid-server-_twRyfjOKtn1sy_TU0m1SJJh'
            });

            let parameter = {
                "transaction_details": {
                    "order_id": "TRANSACTION_" + Math.floor(10000 + Math.random() * 90000),
                    "gross_amount": travel.price
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "email": user.email
                }
            };

            const midtransToken = await snap.createTransaction(parameter)
            res.status(201).json(midtransToken)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    // static async openAi(req, res, next) {
    //     try {
    //         const openai = new OpenAI({
    //             apiKey: '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'
    //         })

    //         const completion = await openai.chat.completions.create({
    //             messages: [{ role: "system", content: "You are a helpful assistant." }],
    //             model: "gpt-3.5-turbo",
    //           });

    //           console.log(completion.choices[0]);
    //     } catch (error) {
    //         next(error)
    //         console.log(error)
    //     }
    // }
}

module.exports = travelController;