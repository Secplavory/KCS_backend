const userModel = require("../models/User");
const crypto = require('crypto');

const userController = {
    getAllUser: async (req, res) => {
        res.json(await userModel.getAllUser());
        return;
    },
    registerUser: async (req, res) => {
        let dataFromClient, phoneNumber, password, gender, name, birthday, cryptoPassword
        try {
            dataFromClient = req.body;
            phoneNumber = dataFromClient.phoneNumber;
            password = dataFromClient.password;
            gender = dataFromClient.gender;
            name = dataFromClient.name;
            birthday = dataFromClient.birthday;
            cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');
        } catch (err) {
            res.json({
                "status": "9999",
                "statusText": "post format not valid"
            })
            return
        }
        let resJson = await userModel.registerUser(
            phoneNumber, cryptoPassword, gender, name, birthday
        );
        res.json(resJson);
        return;
    },
    loginUser: async (req, res) => {
        let dataFromClient, phoneNumber, password, cryptoPassword
        try{
            dataFromClient = req.body
            phoneNumber = dataFromClient.phoneNumber;
            password = dataFromClient.password;
            cryptoPassword = crypto.createHash('sha256').update(password).digest('hex');
        }catch(err){
            res.json({
                "status": "9999",
                "statusText": "post format not valid"
            })
            return
        }
        let user = await userModel.loginUser(phoneNumber, cryptoPassword)
        userHashCode = crypto.createHash('sha256').update(Math.floor(Math.random() * (999 - 1 + 1) + 1).toString()).digest('hex')
        usersHashPair[user.phoneNumber] = userHashCode
        if(user.status === "0000"){
            user.userHashCode = userHashCode
        }
        delete user.phoneNumber
        res.json(user)
        return;
    },
    loginByHash: async (req, res) => {
        let dataFromClient, phoneNumber, userHashCode
        try{
            dataFromClient = req.body
            phoneNumber = dataFromClient.phoneNumber
            userHashCode = dataFromClient.userHashCode
        }catch(err){
            res.json({
                "status": "9999",
                "statusText": "post format not valid"
            })
            return
        }
        if(usersHashPair[phoneNumber] !== userHashCode){
            res.json({
                "status": "0010",
                "statusText": "please login again"
            })
            return
        }
        let resJson = await userModel.getUserByPhoneNumber(phoneNumber)
        res.json(resJson)
    }
}

module.exports = userController;