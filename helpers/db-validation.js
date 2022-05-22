const Plant = require('../models/plant');
const User = require('../models/user');

const emailExits = async (email = '') => {
    const exits = await User.findOne({ email });
    if (exits)
        throw new Error(`El email ${email} ya existe`);
}

const userExits = async (id) => {
    const exits = await User.findById(id);
    if (!exits)
        throw new Error('El usuario no existe');
}

const plantExits = async (id) => {
    const exits = await Plant.findById(id);
    if (!exits)
        throw new Error('Esta planta no existe');
}

module.exports = {
    emailExits,
    userExits,
    plantExits
}