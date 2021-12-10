const express = require('express');

const userController = require("./controllers/User");

const port = 3000;
const app = express();
app.use(express.json());


// app.get('/getAllUser', userController.getAllUser);
app.post('/registerUser', userController.registerUser);
app.post('/loginUser', userController.loginUser);


app.listen(port, ()=>{
    console.log(`KCS backend listening at port: ${port}`)
});