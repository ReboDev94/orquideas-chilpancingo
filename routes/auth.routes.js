const { check } = require('express-validator');
const { Router } = require('express');
const { login, user } = require('../controllers/auth.controller');
const { validationBody } = require('../middlewares/validaton');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();
router.post('/login',
    [
        check('email', 'El correo electronico no es valido').isEmail(),
        check('password', 'La contraseña es obligatorioa').not().isEmpty(),
        validationBody]
    , login);

router.get('/user', [
    validateJWT
], user);

module.exports = router