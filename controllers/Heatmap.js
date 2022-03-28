const HeatmapModel = require('../models/Heatmap');

const Heatmap = {
  getHeatmapProps: async (req, res) => {
    const dataFromClient = req.query;
    const lineID = dataFromClient.lineId;
    const traceBackDate = dataFromClient.traceBackDate;
    let result;
    if (lineID && traceBackDate) {
      result = await HeatmapModel.getHeatmapPropsByLineID__dateScope(
        lineID,
        traceBackDate
      );
    } else if (lineID) {
      result = await HeatmapModel.getHeatmapPropsByLineID(lineID);
    } else if (traceBackDate) {
      result = await HeatmapModel.getHeatmapPropsByDateScope(traceBackDate);
    } else {
      result = await HeatmapModel.getHeatmapProps();
    }
    res.json(result);
  },
  updateSearchtime: async (req, res) => {
    const dataFromClient = req.body;
    const lineID = dataFromClient.lineId;
    const foodName = dataFromClient.foodName;
    const result = await HeatmapModel.updateSearchtime(lineID, foodName);
    res.json(result);
  },
};

module.exports = Heatmap;
