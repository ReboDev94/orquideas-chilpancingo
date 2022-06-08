const jwt = require('jsonwebtoken');
const { response, request } = require('express');
const User = require('../models/user');


const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('X-TOKEN');
    if (!token)
        return res.status(401).json({ msg: 'No autorizado' })

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await User.findById(uid)
            .populate({ path: 'role', model: 'Role' })

        const exitsToken = user.tokens.find((t => t.token == token));

        if (!exitsToken)
            return res.status(401).json({ msg: 'No autorizado' })

        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ msg: 'Token no valido' })
    }

}

module.exports = {
    validateJWT
}