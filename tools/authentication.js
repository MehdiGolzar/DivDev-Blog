function sessionChecker(req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/auth/dashboard');
    }
    next();
};

module.exports = {
    sessionChecker
};