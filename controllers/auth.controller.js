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


const loginGoogle = async (req, res = response) => {
    const { email } = req.body;
    try{
        const existeEmail = await User.findOne({ email });
        const isGoogleLinked = await User.findOne({email, google:true});
        if(isGoogleLinked) {
            return loginAux(req, res, 'google')
        }else if(existeEmail){
            existeEmail.google = true;
            await existeEmail.save();
            return loginAux(req,res,'google');

        }

        const usuario = new User( req.body );
        usuario.google = true;

        await usuario.save();

        // Generar mi JWT
        const token = await generateJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });


    }catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Inicio de Sesión fallido'
        });
    }
}

const loginAux = async ( req, res = response, social ) => {

    const { email } = req.body;

    try {
        
        const usuarioDB = await User.findOne({ email });
        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Generar el JWT
        const token = await generateJWT( usuarioDB.id );
        
        res.json({
            ok: true,
            usuario: usuarioDB,
            loguedWith: social,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Algo salio mal'
        })
    }

}

const user = async (req = request, res = response) => {
    return res.json({ user: req.user })
}

module.exports = {
    login,
    loginGoogle,
    user
}