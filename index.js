const express = require('express');
const cors = require('cors');

const UserController = require("./controllers/User");
const FoodSuggestController = require("./controllers/FoodSuggest")
const FoodController = require("./controllers/Food");
const HealthInfo = require('./controllers/HealthInfo');

global.usersHashPair = {}

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors())

app.get('/getAllUser', UserController.getAllUser);
app.post('/registerUser', UserController.registerUser);
app.post('/loginUser', UserController.loginUser);
app.post('/loginUserByHash', UserController.loginByHash);

app.get('/getAllSuggestion', FoodSuggestController.getAllSuggestion);
app.post('/setSuggestion', FoodSuggestController.setSuggestion);

app.get('/getHighProtein', FoodSuggestController.getHighProtein);
app.get('/getLowProtein', FoodSuggestController.getLowProtein);
app.get('/getHighPotassium', FoodSuggestController.getHighPotassium);
app.get('/getHighPhosphorus', FoodSuggestController.getHighPhosphorus);
app.get('/getHighSalt', FoodSuggestController.getHighSalt);
app.get('/getSafe', FoodSuggestController.getSafe);

app.post('/setHighProtein', FoodSuggestController.setHighProtein)
app.post('/setLowProtein', FoodSuggestController.setLowProtein)
app.post('/setHighPotassium', FoodSuggestController.setHighPotassium)
app.post('/setHighPhosphorus', FoodSuggestController.setHighPhosphorus)
app.post('/setHighSalt', FoodSuggestController.setHighSalt)
app.post('/setSafe', FoodSuggestController.setSafe)

app.get('/getFoodList', FoodController.getFoodList)
app.get('/getFoodListByName', FoodController.getFoodListByName)
app.get('/getFoodListByTag', FoodController.getFoodListByTag)

app.get('/getHealthInformation', HealthInfo.getAllInfo)

app.listen(port, ()=>{
    console.log(`KCS backend listening at http://localhost:${port}`);
});