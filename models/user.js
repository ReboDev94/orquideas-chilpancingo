
const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es oblihatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },
    address: {
        type: String
    },
    zipcode: {
        type: String
    },
    city: {
        type: String
    },
    country: {
        type: String
    },
    tokens: [{ type: Object }],
    role: {
        type: Schema.Types.ObjectId,
        ref: 'roles',
        required: [true, 'El rol es requerido']
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, password, _id,tokens, ...user } = this.toObject();
    user.uid = _id;
    return user;
}



module.exports = model('User', UserSchema);