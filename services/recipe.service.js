const Recipe = require('../db/recipe.schema');

module.exports.getRecipes = () => Recipe.find();

module.exports.createRecipe = (recipe) => new Recipe(recipe).save();
