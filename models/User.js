const db = require('../db')
const util = require("util")

const userModel = {
    getAllUser: async () => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("SELECT * FROM users")
            return {
                "status": "0000",
                "statusText": "Succeed",
                "users": rows
            }    
        }catch(err){
            return {
                "status": "0010",
                "statusText": "DB error"
            }
        }
    },
    registerUser: async (phoneNumber, cryptoPassword, gender, userName, birthDay) => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("INSERT INTO users (phoneNumber, cryptoPassword, gender, name, birthDay)\
            VALUE (?,?,?,?,?)", [phoneNumber, cryptoPassword, gender, userName, birthDay])
            return {
                "status": "0000",
                "statusText": "Succeed",
            }
        }catch(err){
            return {
                "status": "0010",
                "statusText": "DB error"
            }
        }
    },
    loginUser: async (phoneNumber, cryptoPassword) => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("SELECT * FROM users WHERE\
            phoneNumber=? and cryptoPassword=?",[phoneNumber, cryptoPassword])
            if(rows.length){
                return {
                    "phoneNumber": rows[0].phoneNumber,
                    "status": "0000",
                    "statusText": "Succeed"
                }
            }
            return {
                "status": "0010",
                "statusText": "Incorrect phone number and password"
            }
    }catch(err){
            return {
                "status": "0010",
                "statusText": "DB error"
            }
        }
    },
    getUserByPhoneNumber: async (phoneNumber) => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("SELECT * FROM users WHERE phoneNumber=?", [phoneNumber])
            if(rows.length){
                return {
                    "status": "0000",
                    "statusText": "Succeed"
                }
            }
        }catch(err){
            return{
                "status": "0010",
                "statusText": "DB error"
            }
        }
    }
}

module.exports = userModel;