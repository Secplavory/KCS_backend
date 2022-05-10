const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public'));
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname).toLowerCase());
  },
});
const upload = multer({
  storage: storage,
  dest: path.join(__dirname, 'public'),
  limits: { fileSize: 50000 },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Image is not validate.');
  },
}).single('image');

const UserController = require('./controllers/User');
const FoodSuggestController = require('./controllers/FoodSuggest');
const FoodController = require('./controllers/Food');
const HealthInfo = require('./controllers/HealthInfo');
const AutoReply = require('./controllers/AutoReply');
const Heatmap = require('./controllers/Heatmap');
const ImageController = require('./controllers/Image');

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

// 姓名 性別 年齡 最新血壓 最新血糖 疾病類型
app.get('/getUserBasicInfo', UserController.getUserBasicInfo);
// 個別推文
app.get('/getUserTwitter', UserController.getUserTwitter);
// 全部推文 (title查詢)
app.get('/getAllTwitter', UserController.getAllTwitter);
// 個人全血壓 (時間)
app.get('/getUserBloodPressure', UserController.getUserBloodPressure);
// 血壓CRUD
app.post('/bloodPressure', UserController.bloodPressure);
app.put('/bloodPressure', UserController.bloodPressure);
app.delete('/bloodPressure', UserController.bloodPressure);
// 個人全血糖 (時間)
app.get('/getUserBloodSugar', UserController.getUserBloodSugar);
// 血糖CRUD
app.post('/bloodSugar', UserController.bloodSugar);
app.put('/bloodSugar', UserController.bloodSugar);
app.delete('/bloodSugar', UserController.bloodSugar);
// 推文CRUD
app.post('/createTwitter', UserController.createTwitter);
app.put('/updateTwitter', UserController.updateTwitter);
app.delete('/deleteTwitter', UserController.deleteTwitter);
//上傳圖片
app.post('/uploadImage', upload, ImageController.upload);

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
