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
                    "id": rows[0].id,
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
    getUserById: async (id) => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("SELECT * FROM users WHERE id=?", [id])
            if(rows.length){
                return {
                    "status": "0000",
                    "statusText": "Succeed"
                }
            }
            return {
                "status": "0010",
                "statusText": "userHash is not valid"
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