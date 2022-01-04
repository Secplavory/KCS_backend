const express = require('express');
const db = require('./db');
const cors = require('cors');

const userController = require("./controllers/User");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors())


app.get('/getAllUser', userController.getAllUser);
app.post('/registerUser', userController.registerUser);
app.post('/loginUser', userController.loginUser);
app.post('/loginUserByHash', userController.loginByHash);


app.listen(port, ()=>{
    db.connect();
    console.log(`KCS backend listening at port: ${port}`);
});