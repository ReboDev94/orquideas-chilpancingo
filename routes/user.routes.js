const { check } = require('express-validator');
const { Router } = require('express');

const {
    registerUser,
    editUser
} = require('../controllers/user.controller');

const { emailExits } = require('../helpers/db-validation');

const {validationBody,validateJWT} = require('../middlewares');
const router = Router();


router.post('/',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El correo electronico no es valido').isEmail(),
        check('email').custom(emailExits),
        check('password', 'La contraseña debe tener 8 o mas caracteres').isLength({ min: 8 }),
        validationBody,
    ],
    registerUser);

router.put('/',
    [
        validateJWT,
    ]
    , editUser);


module.exports = router;