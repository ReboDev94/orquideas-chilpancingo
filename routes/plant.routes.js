const { check } = require('express-validator');
const { Router } = require('express');
const { registerPlant, getPlants, deletePlant } = require('../controllers/plant.controller');
const { validationBody } = require('../middlewares/validaton');
const { plantExits } = require('../helpers/db-validation');
const { validateJWT } = require('../middlewares/validation-jwt');

const router = Router();


router.post('/',
    [
        check('name').not().isEmpty(),
        check('description').not().isEmpty(),
        check('price').isNumeric(),
        check('stock').isNumeric(),
        check('color').not().isEmpty(),
        check('size').not().isEmpty(),
        check('type').not().isEmpty(),
        check('flower_size').not().isEmpty(),
        validationBody
    ]
    , registerPlant)

router.get('/',
    [
        validateJWT,
        check('page', 'La pagina debe ser un numero').isNumeric().optional(),
        validationBody
    ]
    , getPlants);

router.delete('/:id',
    [
        check('id', 'No es un id valid').isMongoId(),
        check('id').custom(plantExits),
        validationBody,
    ]
    , deletePlant)

module.exports = router;