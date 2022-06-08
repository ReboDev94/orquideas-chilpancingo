const validationBody = require('../middlewares/validaton');
const validateJWT = require('../middlewares/validation-jwt');
const validateRoles = require('../middlewares/validation-role');

module.exports={
    ...validationBody,
    ...validateJWT,
    ...validateRoles
}