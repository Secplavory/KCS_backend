const foodModel = require("../models/Food")

async function getFetchScope(req){
    const dataFromClient = req.body
    let limit; let offset;
    page = parseInt(dataFromClient.page)
    limit = parseInt(dataFromClient.limit)
    offset = (page-1)*limit
    return {
        limit: limit,
        offset, offset,
    }
}

const food = {
    getFoodList:async (req, res) => {
        let limit; let offset;
        try{
           let result = await getFetchScope(req);
           limit = result.limit
           offset = result.offset
        }catch(err){
            return{
                status: "0010",
                statusText: "json data lost"
            }
        }
        if(limit > 20){
            res.json({
                status: "0010",
                statusText: "post data lost"
            })
        }
        const result = await foodModel.getFoodList(offset, limit)
        res.json(result);
        return;
    },
    getFoodListByName: async (req, res)=>{
        let limit; let offset;
        try{
            let result = await getFetchScope(req);
            limit = result.limit
            offset = result.offset
        }catch(err){
            return{
                status: "0010",
                statusText: "DB error"
            }
        }
        if(limit > 20){
            res.json({
                status: "0010",
                statusText: "post data lost"
            })
        }
        let foodName = "%"+req.body.foodName+"%"
        const result = await foodModel.getFoodListByName(foodName, offset, limit)
        res.json(result)
        return;

    },
    getFoodListByTag: async (req, res)=>{
        let limit; let offset;
        try{
            let result = await getFetchScope(req);
            limit = result.limit
            offset = result.offset
        }catch(err){
            return{
                status: "0010",
                statusText: "DB error"
            }
        }
        if(limit > 20){
            res.json({
                status: "0010",
                statusText: "post data lost"
            })
        }
        const result = await foodModel.getFoodListByType(req.body.foodTag, offset, limit)
        res.json(result)
        return;
    }
}

module.exports = food;