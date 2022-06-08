const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generateJWT');


const login = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email })
            .populate({ path: 'role', model: 'Role' })

        if (!user)
            return res.json({ msg: 'El correo o la contraseña no son correctos' });
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword)
            return res.json({ msg: 'El correo o la contraseña no son correctos' });

        const token = await generateJWT(user.id);

        let oldTokens = user.tokens || [];

        if (oldTokens.length) {
            oldTokens = oldTokens.filter(t => {
                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000;
                if (timeDiff < 86400) {
                    return t;
                }
            });
        }

        await User.findByIdAndUpdate(user.id, {
            tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
        });


        return res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Algo salio mal' })
    }
}

const logout = async (req = request, res = response) => {
    const token = req.header('X-TOKEN');

    const tokens = req.user.tokens;
    const newTokens = tokens.filter(t => t.token !== token);

    await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
    res.json({ msg: 'se cerro la sesión' });

}

const user = async (req = request, res = response) => {
    return res.json({ user: req.user })
}

module.exports = {
    login,
    logout,
    user
}