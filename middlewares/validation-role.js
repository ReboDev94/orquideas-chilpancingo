const { request, response } = require('express');
const hasRole = (...roles) => {

    return (req = request, res = response, next) => {

        if (!req.user) {
            return res.status(401).json({ msg: 'No estas autorizado' })
        }

        const { role } = req.user;

        if (!roles.includes(role.slug)) {
            return res.status(401).json({ msg: 'No estas autorizado' });
        }

        next();
    }

}

module.exports = {
    hasRole
}