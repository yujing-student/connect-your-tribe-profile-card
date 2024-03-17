const path = require('path')
const express = require('express')
// const fetchJson = require("../helpers/fetch-json.js");
const app = express()


// Haal data op uit de FDND API, ga pas verder als de data gedownload is
const data = await fetchJson('https://fdnd.directus.app/items/person/9')// https://whois.fdnd.nl/admin/ mijn nummer is 9
const datasquad = await fetchJson('https://fdnd.directus.app/items/squad/3')
data.data.custom = JSON.parse(data.data.custom);/*parsen the string information naar data zoals de rest*/

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '../views'))

app.get('/', (req, res) => {
    res.render('index', {
        text: 'Vercel met EJS en Node. For free :)',
    })
})

module.exports = app