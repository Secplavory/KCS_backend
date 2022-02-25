const foodModel = require("../models/Food")

function getGetFetchScope(){

    return page, limit, offset
}

const food = {
    getFoodList:async (req, res) => {
        const dataFromClient = req.body;
        let page;
        let limit;
        try{
            page = parseInt(dataFromClient.page);
            limit = parseInt(dataFromClient.limit);
        }catch(err){
            res.json({
                status: "0010",
                statusText: "post data lost"
            })
        }
        if(limit > 20){
            res.json({
                status: "0010",
                statusText: "post data lost"
            })
        }
        let offset = (page-1)*limit
        if("foodName" in dataFromClient){
            let foodName = "%"+dataFromClient.foodName+"%"
            const result = await foodModel.getFoodListByName(foodName, offset, limit)
            res.json(result)
            return;
        }
        if("foodTag" in dataFromClient){
            const result = await foodModel.getFoodListByType(dataFromClient.foodTag, offset, limit)
            res.json(result)
            return;
        }
        const result = await foodModel.getFoodList(offset, limit);
        res.json(result);
        return;
    }
}

module.exports = food;