const { authenticate } = require('../config/jwt.config');
const commentController = require('../controllers/comments.controller');
module.exports = (app) => {
    app.post('/api/newcomment/:id',authenticate, commentController.addComment);
    app.get('/api/comments/:id', commentController.getPostComments);

    
}