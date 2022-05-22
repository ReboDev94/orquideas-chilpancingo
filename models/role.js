const { Schema, model } = require('mongoose')
const RolSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre del rol es requerido']
    },
    slug: {
        type: String,
        required: [true, 'El slug del rol es requerido']
    }

});
module.exports = model('Role', RolSchema);