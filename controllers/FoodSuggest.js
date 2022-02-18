const foodSuggestionModel = require("../models/FoodSuggest");

const foodSuggest = {
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
    }
}


module.exports = foodSuggest;