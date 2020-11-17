// required modules/lib
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const fs = require('fs'); // lets us read/parse json files
const path = require('path');// for path

// our modules
const dinoRouter = require('./controllers/dinoController');
const cryptidRouter = require('./controllers/cryptidController');



// create app
const app = express();

//set up
app.use(expressEjsLayouts);
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use('/', express.static(path.join(__dirname, 'public')));

// create home route
app.get('/', (req, res) => {
  res.render('index');
  });

app.use('/dinosaurs', dinoRouter);
app.use('/cryptids', cryptidRouter);


app.listen(7000, () => {});


// CRDU http to SQL
// GET>> SELECT
// POST >> INSERT INTO
// PUT >> UPDATE
// DELETE>> DELETE