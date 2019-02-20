Pseudo code
the idea is to have the user input 3 values of food items they would like use and fetch their recipes
==> recipe API
=> we create 3 user inputs where the user can input a food items
=> we create 3 seperate variables where we store those values in
=> we store the chosen food items values in the variables 
=> we create an empty object called myApp
=> within the myApp object we create a method that fetches our data in our recipe API
=> we use those 3 variables as queries in our fetch methods
=> create error handeling that one of those queries has to be a protein or a vegggie
=> we get returned some data of recipes and we store those into a array 
=> we loop over the array and and display the recipes to the user on the UI
=> the user has the ability to choose a recipe 
=> the user will be brought over to a new page where on the gets to see the full recipe and ingredients of his chosen recipe
=> on the other side of the page, the user gets displayed 3 different that will pair with the chosen dish


==> wine API

=>we create a object of 2 arrays, named red and white wine
=> within those 2 arrays we create  objects of wine
=> example

const wines {
    reds: [
        wine 1:{
            name: Chateau Minervois,
            id: 1,
            pairs with:['steak','mushrooms','"red-wine-sauce', "thyme",],
            price: '$$',
            information:'lorem impsum',
            lcbolink: www.lcbowine.com


        },
        wine 2:{
            name: Chateau Haut Grelot,
            id: 2,
            pairs with:['chicken','vegetable stir fry','"butter sauce', "lemon",],
            price: '$',
            information: 'lorem ipson',
            lcbolink: www.lcbowine.com

        }
    ],
    whites:[
        wine 1:{
            name: Chateau Minervois,
            id: 1,
            pairs with:['steak','mushrooms','"red-wine-sauce', "thyme",],
            price: '$$',
            information:'lorem impsum',
            lcbolink: www.lcbowine.com


        },
        wine 2:{
            name: Chateau Haut Grelot,
            id: 2,
            pairs with:['chicken','vegetable stir fry','"butter sauce', "lemon",],
            price: '$',
            information: 'lorem ipson',
            lcbolink: www.lcbowine.com

        }

    ]
}

=> the items in pairs with have to be the same as the items in the recipes of the API 
=> we compare the ingredients of the recipe the user has chosen and compare those with our wine api
=> we have to write a filtering logic that chooses the the wines that match with the ingredients of the choosen recipe
=> we display those wines to the user
=> the user can click on a link below the wines and get information from the lcbo where to buy the wine


