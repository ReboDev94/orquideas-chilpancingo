const { check } = require('express-validator');
const { Router } = require('express');
const { login, user, loginGoogle } = require('../controllers/auth.controller');
const { validationBody } = require('../middlewares/validaton');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();
router.post('/login',
    [
        check('email', 'El correo electronico no es valido').isEmail(),
        check('password', 'La contraseña es obligatorioa').not().isEmpty(),
        validationBody]
    , login);

router.post('/google', 
[
check("nombre", "El nombre es obligatorio").not().isEmpty(),
check("email", "El correo es obligatorio").isEmail(),
validationBody
],
loginGoogle
);

router.get('/user', [
    validateJWT
], user);

module.exports = router