const express = require('express');
const fs = require('fs');
const planRouter = require('./router/planRouter.js');
const userRouter = require('./router/userRouter.js');
const app = express();



app.use(express.json())
app.use('/api/plans', planRouter);
app.use('/api/user', userRouter);

app.get('*', (req, res) => {
    res.status(404).send("Error 404 Not Found");
    res.end();
})
module.exports = app;
// const bcrypt= require('bcrypt');
// bcrypt.hash('Ronaldo07',8).then((pass)=>{
//     console.log(pass);
// })