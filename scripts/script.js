/*jshint esversion: 6 */

const myApp = {};

myApp.callApi = (query) => {
    const apiId = `a9b9b7a2`;
    const apiKey = `5944b972a9f51cf045008ace83d83548`;
    const endpoint = `http://api.yummly.com/v1/api/recipes?_app_id=${apiId}&_app_key=${apiKey}&q=${query}`;
    fetch(endpoint)
        .then(obj => obj.json())
        .then(data => {
            /* console.log(data.matches); */
            const newArray = data.matches.map(item => {
                return item;
            });
            newArray.forEach(obj => {
                console.log(obj.sourceDisplayName);
            });

        });

};

myApp.init = function () {
    myApp.callApi('chicken');
    console.log(query);
};

$(function () {
    myApp.init();

});