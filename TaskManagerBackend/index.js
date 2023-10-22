const express = require('express');
const app = express();
const port = 8000;
require('./db');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');


app.use(cors());
app.use(bodyParser.json());

// route /
app.get('/',(req,res)=>{
    res.json({
        message : 'API is Working!'
    });
});

// users routes
app.use('/users',userRoutes);

// tasks routes
app.use('/tasks',taskRoutes);

// 404 Page not found!
app.use((req,res,next)=>{
    res.json({
        message : '404 Page not found!'
    });
});

// start server
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
});


