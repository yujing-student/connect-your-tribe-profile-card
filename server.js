// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de/helpers map
import fetchJson from './helpers/fetch-json.js'

// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const data = await fetchJson('https://fdnd.directus.app/items/person/9')// https://whois.fdnd.nl/admin/ mijn nummer is 9
const datasquad = await fetchJson('https://fdnd.directus.app/items/squad/3')


 // data.data.custom = JSON.parse(data.data.custom);/*parsen the string information naar data zoals de rest*/
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#Example.3A_Using_the_reviver_parameter

// console.log(data); // uncomment om de opgehaalde data te checken

// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')
// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources
app.use(express.static('public'))

// Maak een GET route voor de index
app.get('/', function (request, response) {
  // Render index.ejs uit de views map en geef uit FDND API opgehaalde data mee
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
app.set('port', process.env.PORT || 8003)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})
