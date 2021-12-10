const userModel = require("../models/User");
const crypto = require('crypto');

async function isAnyDataUndefine(dataList){
    for(var i=0; i<dataList.length; i++){
        if(typeof dataList[i] === 'undefined'){
            return true;
        }
    }
    return false;
}

const userController = {
    getAllUser: (req, res) => {
        res.json(userModel.getAllUser());
        return;
    },
    registerUser: async (req, res) => {
        let dataFromClient = req.body;
        let phoneNumber = dataFromClient["phoneNumber"];
        let password = dataFromClient["password"];
        let gender = dataFromClient["gender"];
        let name = dataFromClient["name"];
        let age = dataFromClient["age"];
        if(await isAnyDataUndefine([phoneNumber, password, gender, name, age])){
            res.json({
                'status': "0001",
                'statusText': "lost data",
                'dataFromClient': dataFromClient
            });
            return;
        }
        
        let cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');
        let resJson = userModel.registerUser(
            phoneNumber, cryptoPassword, gender, name, age
        );
        resJson.dataFromClient = dataFromClient;
        res.json(resJson);
        return;
    },
    loginUser: async (req, res) => {
        let dataFromClient = req.body
        let phoneNumber = dataFromClient.phoneNumber;
        let password = dataFromClient.password;
        if(await isAnyDataUndefine([phoneNumber, password])){
            res.json({
                'status': "0001",
                'statusText': "lost data",
                'dataFromClient': dataFromClient
            });
            return;
        }
        let cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');
        let user = await userModel.loginUser(phoneNumber, cryptoPassword)
        user.dataFromClient = dataFromClient;
        res.json(user);
        return;
    }
}

module.exports = userController;