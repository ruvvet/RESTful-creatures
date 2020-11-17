// required modules/lib
const express = require('express');
const layouts = require('express-ejs-layouts');
const fs = require('fs'); // lets us read/parse json files
const path = require('path');// for path
const methodOverride = require('method-override');

// our modules
const dinoRouter = require('./controllers/dinoController');
const cryptidRouter = require('./controllers/cryptidController');


// create app
const app = express();

/////////////////////////////////////////////////////
//const app = require('express')(); //??????????????

//set up middleware
// these are all middleware
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));  // use override middleware
app.use(express.urlencoded({extended: false}));
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
// using const app = require('express')(); //?????????????? - it works fine for me w/out it
// continuously re-parsing the json file for each route
// query string search
// how to troubleshoot