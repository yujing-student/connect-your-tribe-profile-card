
// Importeer het npm pakket express uit de node_modules map
// import express from 'express'
// import path from 'path'
async function fetchJson(url, payload = {}) {
    try{//de reden voor een try and catch is zotat er een betere error adhandeling is en dat ik de error in de console log kan zien
        //en de then als die niet reageert dan gaat die automatisch naar de catch
        return await fetch(url, payload)
            .then((response) => response.json())//reageeer op de aanroep en pas de informatie aan aar een json

    }catch (error){
        console.error('Error:', error);
    }

}
const path = require('path')
const express = require('express')
// Import the path module for dirname function
// Importeer de zelfgemaakte functie fetchJson uit de/helpers map

const app = express()

// console.log(data); // uncomment om de opgehaalde data te checken


// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', '../views')

// Gebruik de map 'public' voor statische resources
app.use(express.static(path.join(__dirname, 'public')));

// Maak een GET route voor de index
app.get('/', async function (request, response) {
    // Render index.ejs uit de views map en geef uit FDND API opgehaalde data mee
    // Haal data op uit de FDND API, ga pas verder als de data gedownload is
    const data = await fetchJson('https://fdnd.directus.app/items/person/9')// https://whois.fdnd.nl/admin/ mijn nummer is 9
    const datasquad = await fetchJson('https://fdnd.directus.app/items/squad/3')
    data.data.custom = JSON.parse(data.data.custom);/*parsen the string information naar data zoals de rest*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter

    response.render('index', {data: data, datasquad: datasquad})
//     https://stackoverflow.com/questions/71155182/who-to-render-multiple-fetch-function-in-ejs
//     https://expressjs.com/en/5x/api.html#app.render
//     https://dev.to/mochafreddo/understanding-resredirect-and-resrender-in-expressjs-usage-and-security-measures-2k60


})

// Maak een POST route voor de index
app.post('/', function (request,
                        response) {
    // Er is nog geen afhandeling van POST, redirect naar GET op /
    response.redirect(303, '/')
})

// Stel het poortnummer in waar express op moet gaan luisteren
app.set('port', process.env.PORT || 8002)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})
module.exports = app