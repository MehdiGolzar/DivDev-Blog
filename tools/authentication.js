sessionChecker_dashboard = function (req, res, next) {
    if (req.session.user && req.cookies.user_sid) {
        
        if (req.session.user.role === 'admin') {
            return res.redirect('/admin/dashboard');
        }
        return res.redirect('/auth/dashboard');
    }
    next();
};

sessionChecker_login = function (req, res, next) {
    if (!req.session.user || !req.cookies.user_sid) {
        return res.status(403).redirect('/auth/login');
        // return res.status(403).send('Access denied!');
    };

    next();
};

module.exports = {
    sessionChecker_dashboard,
    sessionChecker_login
};