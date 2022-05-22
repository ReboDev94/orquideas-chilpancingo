
const { Schema, model } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const PlantSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    description: {
        type: String,
        required: [true, 'La descripción es obligatoria']
    },
    price: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    stock: {
        type: Number,
        required: [true, 'El numero de plantas es requerido']
    },
    images: {
        type: [String],
    },
    color: {
        type: String,
        required: [true, 'El color de la planta es requerido']
    },
    size: {
        type: String,
        required: [true, 'Las dimensiones de la planta son requeridas']
    },
    type: {
        type: String,
        required: [true, 'EL tipo de planta es requerido'],
    },
    flower_size: {
        type: String,
        required: [true, 'El tamaño de la flor es requerido']
    }

})

PlantSchema.plugin(mongoosePaginate);


const modelPlant = model('Plant', PlantSchema);
module.exports = modelPlant;
