require("dotenv").config();
const express = require('express');
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')


require('./config/mongoose.config')

app.use(cors({origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser()) 
app.use(express.urlencoded({ extended: true }));
require('./routes/post.routes')(app);
require('./routes/user.routes')(app);
require('./routes/comment.routes')(app);
require('./routes/like.routes')(app);








app.listen(8000,() => {console.log("server is up and running , listening on port 8000")})