const foodModel = require("../models/Food")

async function getFetchScope(req){
    const dataFromClient = req.query
    let limit; let offset;
    page = parseInt(dataFromClient.page)
    limit = parseInt(dataFromClient.limit)
    offset = (page-1)*limit
    return {
        limit: limit,
        offset, offset,
    }
}

async function insertValueStructor(data){
    let valueList = "";
    data.forEach((ele, index) => {
        let id = ele.id
        let foodName = ele.foodName
        let foodTag = ele.foodTag
        let foodKcal = ele.foodKcal
        let foodProtein = ele.foodProtein
        let foodNaa = ele.foodNaa
        let foodKa = ele.foodKa
        let foodP = ele.foodP
        let foodCarbohydrate = ele.foodCarbohydrate

        if(index!==0){
            valueList += ","
        }
        valueList += "("
        if(id!==undefined){
            valueList += `'${id}',`
        }
        valueList += `
        '${foodName}',
        '${foodTag}',
        '${foodKcal}',
        '${foodProtein}',
        '${foodNaa}',
        '${foodKa}',
        '${foodP}',
        '${foodCarbohydrate}'
        `
        valueList += ")"
    });
    return valueList
}

async function deleteValueStructor(data){
    let valueList = "("
    data.forEach((ele, index)=>{
        if(index!==0){
            valueList += ","
        }
        valueList += `'${ele.id}'`
    })
    valueList += ")"
    return valueList
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
        let foodName = "%"+req.query.foodName+"%"
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
        const result = await foodModel.getFoodListByType(req.query.foodTag, offset, limit)
        res.json(result)
        return;
    },
    createFood: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = await insertValueStructor(data);
        res.json(await foodModel.createFood(valueList))
        return;
    },
    updateFood: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = await insertValueStructor(data);
        res.json(await foodModel.updateFood(valueList))
        return;
    },
    deleteFood: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        const valueList = await deleteValueStructor(data);
        res.json(await foodModel.deleteFood(valueList));
        return;
    }
}

module.exports = food;