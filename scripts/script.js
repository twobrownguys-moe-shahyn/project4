/*jshint esversion: 6 */

myApp = {};


// vGet access to the Nutritionix API



myApp.getRecipes = function (queryString) {
    return $.ajax({
        url: `http://api.yummly.com/v1/api/recipes?_app_id=YOUR_ID&_app_key=YOUR_APP_KEY`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Yummly-App-ID': 'a9b9b7a2',
            'X-Yummly-App-Key': '5944b972a9f51cf045008ace83d83548'
        },
        data: {
            requirePictures: true
        },
    })
    myApp.recipeArray = [];
}



$(function () {
    myApp.init();
});

myApp.init = function () {
    myApp.getRecipes();
};

console.log(myApp.getRecipes);