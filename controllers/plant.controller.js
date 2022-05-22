const { response, request } = require('express');
const Plant = require('../models/plant');

const registerPlant = (req = request, res = response) => {

    const { name, description, price, stock, color, size, type, flower_size } = req.body;
    const plant = new Plant({ name, description, price, stock, color, size, type, flower_size });

    plant.save();

    return res.json({ plant });

}

const getPlants = async (req = request, res = response) => {
    const { page = 1, search = '' } = req.query;
    const options = {
        page,
        limit: 2,
        collation: {
            locale: 'en',
        },
    };
    const plants = await Plant.paginate({ name: { $regex: '.*' + search } }, options);
    return res.json({ plants });
}

const deletePlant = async (req = request, res = response) => {
    const { id } = req.params;
    const plant = await Plant.findByIdAndDelete(id);
    return res.json({plant});

}
module.exports = {
    registerPlant,
    getPlants,
    deletePlant
}