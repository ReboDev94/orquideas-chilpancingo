const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Role = require('../models/role');

const registerUser = async (req = request, res = response) => {
    const { email, name, password } = req.body;
    const role = await Role.findOne({ slug: 'normal' });
    const user = new User({ email, name, password, role: role._id });

    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.json({ user })
}

const editUser = async (req = request, res = response) => {
    const id = req.uid;

    const { _id, password, google, role, email, ...rest } = req.body;
    const user = await User.findByIdAndUpdate(id, rest);
    res.json({ user })
}


module.exports = {
    registerUser,
    editUser
}