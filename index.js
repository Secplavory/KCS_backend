const express = require('express');
const cors = require('cors');

const UserController = require('./controllers/User');
const FoodSuggestController = require('./controllers/FoodSuggest');
const FoodController = require('./controllers/Food');
const HealthInfo = require('./controllers/HealthInfo');
const AutoReply = require('./controllers/AutoReply');
const Heatmap = require('./controllers/Heatmap');

global.usersHashPair = {};
global.lineState = [];

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

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

app.post('/setHighProtein', FoodSuggestController.setHighProtein);
app.post('/setLowProtein', FoodSuggestController.setLowProtein);
app.post('/setHighPotassium', FoodSuggestController.setHighPotassium);
app.post('/setHighPhosphorus', FoodSuggestController.setHighPhosphorus);
app.post('/setHighSalt', FoodSuggestController.setHighSalt);
app.post('/setSafe', FoodSuggestController.setSafe);

app.get('/getFoodList', FoodController.getFoodList);
app.get('/getFoodListByName', FoodController.getFoodListByName);
app.get('/getFoodListByTag', FoodController.getFoodListByTag);
app.post('/createFood', FoodController.createFood);
app.post('/updateFood', FoodController.updateFood);
app.post('/deleteFood', FoodController.deleteFood);

app.get('/getHealthInformation', HealthInfo.getAllInfo);
app.post('/createHealthInformation', HealthInfo.createInfo);
app.post('/updateHealthInformation', HealthInfo.updateInfo);
app.post('/deleteHealthInformation', HealthInfo.deleteInfo);
app.post('/createHealthInformationRelations', HealthInfo.createInfoRelations);
app.post('/updateHealthInformationRelations', HealthInfo.updateInfoRelations);
app.post('/deleteHealthInformationRelations', HealthInfo.deleteInfoRelations);

// app.get('/lineLogin', UserController.lineLogin);
// app.get('/getLinebotParameters', UserController.getLinebotParameters);

app.get('/getAllAutoReply', AutoReply.getAll);
app.get('/getAutoReplyByKey', AutoReply.getReplyByKey);
app.post('/autoReplyCreate', AutoReply.createReply);
app.post('/autoReplyUpdate', AutoReply.updateReply);
app.post('/autoReplyDelete', AutoReply.deleteReply);
app.post('/autoReplyContentCreate', AutoReply.createReplyContent);
app.post('/autoReplyContentUpdate', AutoReply.updateReplyContent);
app.post('/autoReplyContentDelete', AutoReply.deleteReplyContent);

app.get('/getHeatmapProps', Heatmap.getHeatmapProps);
app.post('/updateSearchtime', Heatmap.updateSearchtime);

app.listen(port, () => {
  console.log(`KCS backend listening at http://localhost:${port}`);
});
