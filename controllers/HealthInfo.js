const HealthInfoModel = require("../models/HealthInfo");

const insertHealthinfoStructor = (data)=>{
    let valueList = ""
    data.forEach((ele, index) => {
        let id = ele.id
        let title = ele.title
        let brief_desc = ele.brief_desc
        let notification = ele.notification
        let imgsrc = ele.imgsrc
        let full_desc = ele.full_desc
        if(index!==0){
            valueList += ","
        }
        valueList += "("
        if(id!==undefined){
            valueList += `'${id}',`
        }
        valueList += `
        '${title}',
        '${brief_desc}',
        '${notification}',
        '${imgsrc}',
        '${full_desc}'
        `
        valueList += ")"
    });
    return valueList
}

const isnertHealthinfoRelationsStructor = (data)=>{
    let valueList = ""
    data.forEach((ele, index)=>{
        if(index!==0){
            valueList += ","
        }
        valueList += "("
        if(ele.id!==undefined){
            valueList += `'${ele.id}',`
        }
        valueList += 
        `
        '${ele.healthinfoid}',
        '${ele.healthinfolistid}',
        '${ele.sorted}'
        `
        valueList += ")"
    })
    return valueList;
}

const deleteValueStructor = (data)=>{
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

const HealthInfo = {
    getAllInfo: async (req, res) => {
        res.json(await HealthInfoModel.getHealthInfoList());
        return;
    },
    createInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = insertHealthinfoStructor(data);
        res.json(await HealthInfoModel.createHealthInfo(valueList));
        return;
    },
    updateInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = insertHealthinfoStructor(data);
        res.json(await HealthInfoModel.updateHealthInfo(valueList));
        return;
    },
    deleteInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        const valueList = deleteValueStructor(data);
        res.json(await HealthInfoModel.deleteHealthInfo(valueList))
        return;
    },
    createInfoRelations: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        const valueList = isnertHealthinfoRelationsStructor(data)
        res.json(await HealthInfoModel.createInfoRelations(valueList));
        return;
    },
    updateInfoRelations: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = isnertHealthinfoRelationsStructor(data);
        res.json(await HealthInfoModel.updateInfoRelations(valueList));
        return;
    },
    deleteInfoRelations: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        const valueList = deleteValueStructor(data);
        res.json(await HealthInfoModel.deleteInfoRelations(valueList));
        return;
    }
}

module.exports = HealthInfo;