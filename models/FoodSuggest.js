const db = require('../db')
const util = require('util');

const foodSuggestion = {
    getAllSuggestion: async () => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query("SELECT title, suggest FROM foodsuggestion")
                    res({
                        status: "0000",
                        statusText: "Success",
                        data: rows,
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    getSuggestion: async (id) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query("SELECT title, suggest FROM foodsuggestion\
                    WHERE id=?", [id])
                    res({
                        status: "0000",
                        statusText: "Succeed",
                        title: rows[0],
                        suggest: rows[1],
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result;
    },
    setSuggestion: async (id, title, suggest) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    await query("UPDATE foodsuggestion\
                    SET title=?, suggest=?\
                    WHERE id=?", [title,suggest,id])
                    res({
                        status: "0000",
                        statusText: "Succeed"
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    }
}

module.exports = foodSuggestion;