const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');


const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
        if (!user)
            return res.json({ msg: 'El correo o la contraseña no son correctos' });
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword)
            return res.json({ msg: 'El correo o la contraseña no son correctos' });
        const token = await generateJWT(user.id);
        return res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Algo salio mal' })
    }
}

const user = async (req = request, res = response) => {
    return res.json({ user: req.user })
}

module.exports = {
    login,
    user
}