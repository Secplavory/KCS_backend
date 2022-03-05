const HealthInfoModel = require("../models/HealthInfo");

const insertValueStructor = (data)=>{
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

const HealthInfo = {
    getAllInfo: async (req, res) => {
        res.json(await HealthInfoModel.getHealthInfoList());
        return;
    },
    createInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = insertValueStructor(data);
        res.json(await HealthInfoModel.createHealthInfo(valueList));
        return;
    },
    updateInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = insertValueStructor(data);
        res.json(await HealthInfoModel.updateHealthInfo(valueList));
        return;
    },
    deleteInfo: async (req, res) => {
        // const dataFromClient = req.body;
        res.json({
            status: "0010",
            statsuText: "安全考量先不開發"
        })
        return;
    }
}

module.exports = HealthInfo;