module.exports = function(app, passport) {
    
    // route for home page
    
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}