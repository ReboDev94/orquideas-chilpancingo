const { check } = require('express-validator');
const { Router } = require('express');
const { login, logout, user } = require('../controllers/auth.controller');
const { validationBody, validateJWT } = require('../middlewares');


const router = Router();
router.post('/login',
    [
        check('email', 'El correo electronico no es valido').isEmail(),
        check('password', 'La contraseña es obligatorioa').not().isEmpty(),
        validationBody]
    , login);

router.post('/logout', [validateJWT], logout);

router.get('/user', [
    validateJWT
], user);

module.exports = router