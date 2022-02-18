const express = require('express');
const db = require('./db');
const cors = require('cors');

const userController = require("./controllers/User");
const foodSuggestController = require("./controllers/FoodSuggest")
global.userHashPair = {}

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors())

app.get('/getAllUser', userController.getAllUser);
app.post('/registerUser', userController.registerUser);
app.post('/loginUser', userController.loginUser);
app.post('/loginUserByHash', userController.loginByHash);

app.get('/getHighProtein', foodSuggestController.getHighProtein);
app.get('/getLowProtein', foodSuggestController.getLowProtein);
app.get('/getHighPotassium', foodSuggestController.getHighPotassium);
app.get('/getHighPhosphorus', foodSuggestController.getHighPhosphorus);
app.get('/getHighSalt', foodSuggestController.getHighSalt);
app.get('/getSafe', foodSuggestController.getSafe);

app.post('/setHighProtein', foodSuggestController.setHighProtein)
app.post('/setLowProtein', foodSuggestController.setLowProtein)
app.post('/setHighPotassium', foodSuggestController.setHighPotassium)
app.post('/setHighPhosphorus', foodSuggestController.setHighPhosphorus)
app.post('/setHighSalt', foodSuggestController.setHighSalt)
app.post('/setSafe', foodSuggestController.setSafe)

app.listen(port, ()=>{
    db.connect();
    console.log(`KCS backend listening at port: ${port}`);
});