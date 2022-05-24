const LikeController = require('../controllers/like.controller');
module.exports = (app) => {
    app.post('/api/like/:id', LikeController.like);
    app.get('/api/likes/:id', LikeController.getLikes);

    // app.post('/api/posts/:id', userController.getUserPosts);
    // app.post('/api/user/logout', UserController.logout);
    // app.get('/api/users',authenticate, UserController.getLoggedInUser);
    
}