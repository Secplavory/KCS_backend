const userModel = require("../models/User");
const crypto = require('crypto');

let usersHashPair = {}

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
        usersHashPair[userHashCode] = user.id
        user.userHashCode = userHashCode
        delete user.id
        res.json(user)
        console.log(usersHashPair)
        return;
    },
    loginByHash: async (req, res) => {
        let dataFromClient, userHashCode
        try{
            dataFromClient = req.body
            userHashCode = dataFromClient.userHashCode
        }catch(err){
            return {
                "status": "9999",
                "statusText": "post format not valid"
            }
        }
        let id = usersHashPair[userHashCode]
        let resJson = await userModel.getUserById(id)
        res.json(resJson)
    }
}

module.exports = userController;