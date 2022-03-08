const foodSuggestionModel = require("../models/FoodSuggest");

const foodSuggest = {
    getAllSuggestion: async (req, res) => {
        let result = await foodSuggestionModel.getAllSuggestion();
        res.json(result);
        return;
    },
    setSuggestion: async (req, res) => {
        let dataFromClient = req.body;
        if(!("data" in dataFromClient)){
            res.json({
                "status": "0010",
                "statusText": "post json lost"
            })
            return;
        }
        if(dataFromClient.data.length > 10){
            res.json({
                "status": "0010",
                "statusText": "post json lost"
            })
            return;
        }
        let result;
        for(var i=0; i<dataFromClient.data.length; i++){
            result = await foodSuggestionModel.setSuggestion(
                dataFromClient.data[i].id,
                dataFromClient.data[i].title,
                dataFromClient.data[i].suggest.replace(/\n/g, '\r')
            );
            if(result===undefined){
                break;
            }
        }
        res.json(result);
        return;
    },
    getHighProtein: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(1))
        return;
    },
    getLowProtein: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(2))
        return;
    },
    getHighPotassium: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(3))
        return;
    },
    getHighPhosphorus: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(4))
        return;
    },
    getHighSalt: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(5))
        return;
    },
    getSafe: async (req, res) => {
        res.json(await foodSuggestionModel.getSuggestion(6))
        return;
    },
    setHighProtein: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(1, dataFromClient.title, dataFromClient.suggest))
        return;
    },
    setLowProtein: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(2, dataFromClient.title, dataFromClient.suggest))
        return;
    },
    setHighPotassium: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(3, dataFromClient.title, dataFromClient.suggest))
        return;
    },
    setHighPhosphorus: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(4, dataFromClient.title, dataFromClient.suggest))
        return;
    },
    setHighSalt: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(5, dataFromClient.title, dataFromClient.suggest))
        return;
    },
    setSafe: async (req, res) => {
        const dataFromClient = req.body;
        res.json(await foodSuggestionModel.setSuggestion(6, dataFromClient.title, dataFromClient.suggest))
        return;
    },
}


module.exports = foodSuggest;