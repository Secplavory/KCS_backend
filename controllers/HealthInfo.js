const HealthInfoModel = require("../models/HealthInfo");

const HealthInfo = {
    getAllInfo: async (req, res) => {
        res.json(await HealthInfoModel.getHealthInfoList());
        return;
    }
}

module.exports = HealthInfo;