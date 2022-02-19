const db = require('../db')
const util = require('util');

const foodSuggestion = {
    getSuggestion: async (id) => {
        const query = util.promisify(db.query).bind(db)
        try{
            const rows = await query("SELECT title, suggest FROM foodsuggestion\
            WHERE id=?", [id])
            return {
                status: "0000",
                statusText: "Succeed",
                title: rows[0],
                suggest: rows[1]
            }
        }catch(err){
            return {
                status: "0010",
                statusText: "DB error"
            }
        }
    },
    setSuggestion: async (id, title, suggest) => {
        const query = util.promisify(db.query).bind(db)
        try{
            await query("UPDATE foodsuggestion\
            SET title=?, suggest=?\
            WHERE id=?", [title,suggest,id])
            return {
                status: "0000",
                statusText: "Succeed",
            }
        }catch(err){
            return {
                status: "0010",
                statusText: "DB error",
            }
        }
    },
}

module.exports = foodSuggestion;