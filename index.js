// required modules/lib
const express = require('express');
const layouts = require('express-ejs-layouts');

const path = require('path');// for path
const methodOverride = require('method-override');

// our modules
const dinoRouter = require('./controllers/dinoController');
const cryptidRouter = require('./controllers/cryptidController');


// create app
const app = express();

//set up middleware
// these are all middleware
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));  // use override middleware
app.use(express.urlencoded({extended: false})); // makes sure the url params/query is parseable
app.use(layouts);
app.use('/', express.static(path.join(__dirname, 'public')));

// create home route
app.get('/', (req, res) => {
  res.render('index');
  });

app.use('/dinosaurs', dinoRouter);
app.use('/cryptids', cryptidRouter);


app.listen(4000, () => {});


// CRDU http to SQL
// GET>> SELECT
// POST >> INSERT INTO
// PUT >> UPDATE
// DELETE>> DELETE


// QUETIONS
// continuously re-parsing the json file for each route
// query string search
// how to troubleshoot