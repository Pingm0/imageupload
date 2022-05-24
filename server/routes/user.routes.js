const { authenticate } = require('../config/jwt.config');
const userController = require('../controllers/user.controller');
module.exports = (app) => {
    app.post('/api/register', userController.createUser);
    app.post('/api/user/login', userController.loginUser);
    app.post('/api/user/logout', userController.logout);
    app.get('/api/user',authenticate, userController.getLoggedInUser);


    
}