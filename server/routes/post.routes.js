const { authenticate } = require('../config/jwt.config');
const PostController = require('../controllers/post.controller');
const upload = require('../config/multer.config')
module.exports = (app) => {
    // app.post('/api/post',authenticate,PostController.createPost);
    app.post('/api/post',upload.single('postPicture'),PostController.createPost);
    app.get('/api/userposts',authenticate, PostController.getUserPosts);
    app.get('/api/all/posts', PostController.getAllPosts);


    
}