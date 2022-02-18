function accessController(roles) {
    return function (req, res, next) {
        if (!roles.include(req.session.user.role)) {
            return res.status(403).send('Access denid')
        }

        next();
    }
}

module.exports = {
    accessController,
}