const db = require('../db')
const util = require('util');

const food = {
    getFoodList: async (offset, limit) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query(
                        "SELECT * FROM food \
                        WHERE foodId >= (SELECT foodId FROM food limit ?, 1)\
                        limit ?", [offset, limit])
                    res({
                        status: "0000",
                        statusText: "Succeed",
                        data: rows
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    getFoodListByType: async (foodTag, offset, limit) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query(
                        "SELECT * FROM food \
                        WHERE foodTag=? and foodId >= (SELECT foodId FROM food WHERE foodTag=? limit ?, 1)\
                        limit ?", [foodTag, foodTag, offset, limit])
                    res({
                        status: "0000",
                        statusText: "Succeed",
                        data: rows
                    })
                }catch(err){
                    rej(err)
                }
                conn.release();
            })
        }).catch((err)=>{console.error(err)})
        return result
    },
    getFoodListByName: async (foodName, offset, limit) => {
        const result = await new Promise((res, rej)=>{
            db.getConnection(async (_, conn)=>{
                try{
                    const query = util.promisify(conn.query).bind(conn)
                    const rows = await query(
                        "SELECT * FROM food \
                        WHERE foodName like ? and foodId >= (SELECT foodId FROM food WHERE foodName like ? limit ?, 1)\
                        limit ?", [foodName, foodName, offset, limit])
                    res({
                        status: "0000",
                        statusText: "Succeed",
                        data: rows
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

module.exports = food;