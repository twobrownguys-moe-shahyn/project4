const myApp = {};
let start = 10;
const apiId = `a9b9b7a2`;
const apiKey = `5944b972a9f51cf045008ace83d83548`;
const endpoint = `https://api.yummly.com/v1/api/recipes?_app_id=${apiId}&${apiKey}`;


myApp.firstScroll = () =>{
    $(".button").click(function () {
        $('html,body').animate({
                scrollTop: $(".recipesListSection").offset().top
            },
            'slow');
    });
}

myApp.secondScroll = () =>{
    $(".recipeBox").click(function () {
        $('html,body').animate({
                scrollTop: $(".showRecipe").offset().top
            },
            'slow');
    });
}


myApp.thirdScroll = () =>{
    $(".pair").click(function () {
        $('html,body').animate({
                scrollTop: $(".showWine").offset().top
            },
            'slow');
    });
}
myApp.lastScroll = () =>{
    $(".top").click(function () {
        $('html,body').animate({
                scrollTop: $(".button").offset().top
            },
            'slow');
    });

}






myApp.getMoreResults = (query) =>{
    $('.next').click(function (e) { 
        e.preventDefault();
        start = start + 10;
        fetch(`https://api.yummly.com/v1/api/recipes?_app_id=${apiId}&_app_key=${apiKey}&q=${query}
        &maxResult=12&start=${start}`)
        .then(state => state.json()).then(data => {
            myApp.displayRecipes(data);
    
        }).catch( data =>{
            alert('Sorry No more items!')
        })
        
    });
    
    $('.previous').click(function (e) { 
        e.preventDefault();
        start = start - 10;
        fetch(`https://api.yummly.com/v1/api/recipes?_app_id=${apiId}&_app_key=${apiKey}&q=${query}
        &maxResult=12&start=${start}`)
        .then(state => state.json()).then(data => {
            myApp.displayRecipes(data);
    
        }).catch( data =>{
            alert('Sorry No more items!')
        })
        
    });
}

myApp.callApi = (query) => { 
    myApp.getMoreResults(query);
    myApp.firstScroll();

    $.ajax({
        url: endpoint,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Yummly-App-ID': apiId,
            'X-Yummly-App-Key': apiKey,
        },
        data: {
            q: query,
            requirePictures: true,
            maxResult: 12,
            start: 10,
            allowedIngredient: 'chicken',
            
        }
    }).then(data => {
        myApp.displayRecipes(data);
    }).catch(data =>{
        const failHTML = 
        `
        <div class="failed">
            <h1>Sorry! Something went wrong</h1>
        </div>
        `;
        $('.recipes').append(failHTML);
    })
};

myApp.callSecondApi = () => {
    myApp.secondScroll();
    $('.recipeBox').click(function (e) {
        id = $(this);
        id = id[0].dataset.id;
        e.preventDefault();
        const getTheRecipe = `https://api.yummly.com/v1/api/recipe/${id}?_app_id=${apiId}&_app_key=${apiKey}`;
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
        }).catch(data =>{
            const failHTML =
                `
            <div class="failed">
                <h1>Sorry! Something went wrong</h1>
            </div>
            `;
            $('.showRecipe').append(failHTML);

        })
    });
};

myApp.getValue = (value) => {
    $('.button').click(function (e) {
        e.preventDefault();
        value = $(this).val();
        myApp.callApi(value);
    });
};

myApp.displayRecipes = (data) => {
    $('.recipes').empty();
    data.matches.forEach(recipe => {
        const recipeHTML = `<div data-id="${recipe.id}" class="recipeBox"> 
                                <figure>
                                    <img src="${recipe.smallImageUrls[0]}">
                                    <figcaption>${recipe.recipeName}</figcaption>
                                </figure>
                            </div>`;
        $('.recipes').append(recipeHTML);
    });
    myApp.callSecondApi();
};

myApp.getFullRecipeHTML = (info) => {
    $('.listItems').empty();
    const recipeHTML =
    `
    <div class="theRecipe">
        <h2>${info.name}</h2>
        <div class="recipeImg">
            <img src="${info.images[0].hostedLargeUrl}">
        </div>
        <p><span class='bold'>Number of Servings:</span> ${info.numberOfServings}</p>
        <p><span class='bold'> Total Prep Time:</span> ${info.totalTime}</p> 
        <div class="pairWithWine">
            <button class="pair">Pair Me!</button>
        </div>
    </div>
    `;
            $('.showRecipe').empty();
            $('.listIngredients').empty();
            $('.listIngredients').prepend('<h3>Ingredients</h3>')
            $('.listIngredients').append('<button class="pair">Pair Me!</button>');
            $('.showRecipe').prepend(recipeHTML);
            const ingredientList = info.ingredientLines.map(foodItem => foodItem);
            ingredientList.forEach(ingredient => $('.listIngredients').append(`<li>${ingredient}<li>`));
            myApp.displayWine(info);
            myApp.thirdScroll();
};

myApp.displayWine = (info) => {
    $('.pair').click(function (e) {
        e.preventDefault();
        const protein = info.name;
        const redWines = wines.wine;
        const filteredOption = redWines.filter((wine) => {
            if (protein.toLowerCase().includes(wine.pairing.toLowerCase())) {
                return true;
            }
            if (wine.pairing === protein) {
                return true;
            } else {
                return false;
            }
        });
        filteredOption.forEach(item => {
            const wineHTML =
                `<div class="wine">
                    <div class="wineDesc">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <span>${item.price}</span>
                        <a href="${item.link}">LCBO</a>
                        <button class="top">Back to top</button>
                    </div>
                    <div class="wineImg">
                        <img src="${item.image}">
                    </div>
                </div>`;
            $('.showWine').empty();
            $('.showWine').append(wineHTML);
            myApp.lastScroll();
        });
    });
};

myApp.init = () => {
    myApp.callApi();
    myApp.getValue();

};


$(function () {
    myApp.init();

});