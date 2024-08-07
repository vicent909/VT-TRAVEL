const { Travel, User, UserTravel, Image } = require('../models');
const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
    cloud_name: "diymv0tqb",
    api_key: "428231918617181",
    api_secret: "o8efN9jnCZcxy3HI2bk3X-ABLN8" 
})


class travelController{ 
    static async getTravel(req, res, next){
        try {
            const data = await Travel.findAll();

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getTravelById(req, res, next){
        const { id } = req.params;
        try {
            const data = await Travel.findByPk(id);

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async addTravel(req, res, next){
        const { destination, description, price, capacity } = req.body;
        try {
            const data = await Travel.create({ destination, description, price, capacity });

            res.status(201).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    } 

    static async addImageTravel(req, res, next){
        const { id } = req.params;
        try {
            const travel = await Travel.findByPk(id);

            if(!travel) throw { name: 'NotFound' };

            const file = req.file;
            const base64 = file.buffer.toString("base64");

            const result = await cloudinary.uploader.upload(
                `data:${file.mimetype};base64,${base64}`
            );

            const upload = await Image.create({ TravelId: id, imageUrl: result.secure_url })

            res.status(200).json({imageUrl: result.secure_url});
        } catch (error) {
            next(error)
            console.log(error)
        }
    } 

    static async getImage(req, res, next){
        const { id } = req.params;
        try {
            const data = await Image.findOne({ where: { TravelId: id } });

            if(!data) throw { name: 'NotFound' }
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async editTravel(req, res, next){
        const { id } = req.params;
        const { destination, description, price, capacity } = req.body;
        try {
            const data = await Travel.findByPk(id);

            if(!data) throw { name: 'NotFound' }

            data.update({ destination, description, price, capacity })

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async joinTravel(req, res, next){
        const { id, UserId } = req.params;
        try {
            const travel = await Travel.findByPk(id);

            if(!travel) throw { name: 'NotFound' }

            const user = await User.findByPk(UserId);

            if(!user) throw { name: 'NotFound' }

            const data = await UserTravel.create({ UserId: UserId, TravelId: id});

            res.status(201).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }

    static async getUserTravel(req, res, next){
        try {
            const data = await UserTravel.findAll();

            res.status(200).json(data)
        } catch (error) {
            next(error)
            console.log(error)
        }
    }
}

module.exports = travelController;