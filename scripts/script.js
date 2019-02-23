/*jshint esversion: 6 */

const myApp = {};
const apiId = `a9b9b7a2`;
const apiKey = `5944b972a9f51cf045008ace83d83548`;
const endpoint = `http://api.yummly.com/v1/api/recipes?_app_id=${apiId}&${apiKey}`


myApp.callApi =(query) =>{
    $.ajax({
        url: endpoint,
        method:'GET',
        headers: {
            'Content-Type': 'application/json',
                'X-Yummly-App-ID': apiId,
                'X-Yummly-App-Key': apiKey,
            },
            data: {
                q: query,
                requirePictures: true,
                maxResult: 3,
                start: 9,
            }
        }).then(data => {
            myApp.displayRecipes(data);
        });
}

myApp.callSecondApi = () =>{
    $('.recipeBox').click(function (e) {
        id = $(this);
        id = id[0].dataset.id;
        e.preventDefault();
        const getTheRecipe = `http://api.yummly.com/v1/api/recipe/${id}?_app_id=${apiId}&_app_key=${apiKey}`
        $.ajax({
            url: getTheRecipe,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Yummly-App-ID': apiId,
                'X-Yummly-App-Key': apiKey,
            }
        }).then(info => {
            myApp.getFullRecipeHTML(info);
            myApp.displayWine(info);
        })
    });
}

myApp.getValue = (value) => {
    $('.button').click(function (e) {
        e.preventDefault();
        value = $(this).val();
        myApp.callApi(value);
    });
}

myApp.displayRecipes = (data) => {
    $('.recipes').empty();
    data.matches.forEach(recipe => {
        const recipeHTML = `
        <div data-id="${recipe.id}" class="recipeBox">
            <a>${recipe.recipeName}</a>
            <img src="${recipe.smallImageUrls[0]}">
        </div>
        `
        $('.recipes').append(recipeHTML);
    })
    myApp.callSecondApi();
}

myApp.getFullRecipeHTML = (info) =>{
    $('.listItems').empty();
    const recipeHTML =
        `
    <h2>${info.name}</h2>
    <p>Number of servings: ${info.numberOfServings}</p>
    <span>${info.totalTime}</span>
    <div class="recipeImg">
        <img src="${info.images[0].hostedMediumUrl}">
    </div>
    <div class="linkToRecipe">
        <a href="${info.sourceRecipeUrl}"><button>Give me the recipe</button></a>
    </div>
    <div class="pairWithWine">
    <button class="pair">Pair Me!</button>
    </div>
    `
    $('.showRecipe').empty();
    $('.showRecipe').prepend(recipeHTML);
    const ingredientList = info.ingredientLines.map( foodItem => foodItem);
    ingredientList.forEach(ingredient => $('.listItems').append(`<li>${ingredient}<li>`));

myApp.displayWine = (info) =>{
    $('.pair').click(function (e) { 
        e.preventDefault();
        const protein = info.name;
        const redWines = wines.reds;
        const filteredOption = redWines.filter((wine) =>{
            if(protein.toLowerCase().includes(wine.pairing.toLowerCase())){
                return true
            }
            if(wine.pairing === protein){
                return true
            } else{
                return false
            }
        })
        filteredOption.forEach(item =>{
            const wineHTML = 
            `
            <div class="wine">
                <h3>${item.name}</h3>
                <p>${item.desc}</p>
                <span>${item.price}</span>
                <div class="wineImg">
                    <img src="${item.image}">
                </div>
                <a href="${item.link}">LCBO Page</a>
            </div>  
            `
            $('.showWine').empty();
            $('.showWine').append(wineHTML);
            });   
        })
}


}

myApp.init = () => {
    myApp.callApi();
    myApp.getValue(); 
};


$(function () {
    myApp.init();

});
