const HealthInfoModel = require("../models/HealthInfo");

const HealthInfo = {
    getAllInfo: async (req, res) => {
        res.json(await HealthInfoModel.getHealthInfoList());
        return;
    },
    createInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;
        let valueList = ""
        data.forEach((ele, index) => {
            let title = ele.title
            let brief_desc = ele.brief_desc
            let notification = ele.notification
            let imgsrc = ele.imgsrc
            let full_desc = ele.full_desc
            if(index!==0){
                valueList += ","
            }
            valueList += `\
            (\
                '${title}',\
                '${brief_desc}',\
                '${notification}',\
                '${imgsrc}',\
                '${full_desc}'\
            )`
        });
        res.json(await HealthInfoModel.createHealthInfo(valueList))
        return;
    },
    modifyInfo: async (req, res) => {
        const dataFromClient = req.body;
        const data = dataFromClient.data;

        return;
    },
    deleteInfo: async (req, res) => {
        const dataFromClient = req.body;
        const id = dataFromClient.id;
        
        return;
    }
}

module.exports = HealthInfo;