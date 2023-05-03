const { error } = require('console');
const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));



// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get("/", (req, res) => {

  res.render("index.hbs")
})
app.get("/beers", (req, res) => {
 punkAPI
 .getBeers()
 .then((response) => {
  console.log(response)
  let allBeers = Object.keys (response.message)
  res.render("beers.hbs", {
    allBeers: allBeers
  })
 })
 .catch((error) => {
  console.log(error)
 })

})
app.get("/random-beer", (req, res) => {
punkAPI
.getRandom()
.then(responseFromApi => {
  console.log(responseFromApi)
  res.render("random-beer.hbs", {
        imageBeer: responseFromApi.message
  })
})
  .catch((error) => {
    console.log(error)
  }) 
})
app.listen(3800, () => console.log('🏃‍ on port 3800'));
