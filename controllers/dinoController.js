// dinorouter is isolated in this file
// has no knowledge of other express settings
//
const dinoRouter = require('express').Router();




// lets us read/parse json files
const fs = require('fs');

//dinoRouter.use(express.urlencoded({ extended: false })); //does this go here or in index.js?????

// dont keep it global /////////////////////////////////////////////////////
// //let dinosaurs = fs.readFileSync('./dinosaurs.json'); // reads the json file
// //let dinoData = JSON.parse(dinosaurs)  // parses the data into json
// let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));



// if data is static, make it global
// if data changes, need to re-load the data w/ each route
// >>> can implement cacheing > after an update, update the global
//






//////////////// GET - show all
// create dinosaurs route to show all dinos
dinoRouter.get('/', (req, res) => {
  console.log('---GET---');
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  res.render('dinosaurs/index', { title: 'all dinos', dinosaurs});
});









//////////////// POST - new
// needs to be above show route since it checks sequentially
// first create the get route which shows the form
dinoRouter.get('/new', (req, res) => {
  console.log('---GET (to make new)---');
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  res.render('dinosaurs/new', { title: 'create a new dino' });
});

// then get the data from form and post it
dinoRouter.post('/new', (req, res) => {
  console.log('---POST (to make new)---');
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  let newDino = req.body;
  dinosaurs.push(newDino);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  res.redirect('/dinosaurs'); // if you don't redirect and you refresh, it submits again
});


// form action (url of the request) == the post "route"
// POST executes w/out redirecting
// executes a post request
// puts form inputs into a body
// as an object of {key:value pairs}

// GET >> redirects
// GET has no body
// so a form gives a query





//////////////// SEARCH W/ PARAMETER
dinoRouter.get('/search/:searchTerm', (req, res) => {
  console.log('---GET (for search)---', req.params);
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  const searchDino = req.params.searchTerm.toLowerCase();

  let dinosearchIndex;

  dinosaurs.forEach((dino) => {
    if (dino.name.toLowerCase() == searchDino || dino.type == searchDino) {
      dinosearchIndex = dinosaurs.indexOf(dino);
    }
  });

  const title = `search dino ${searchDino} which is at index: ${dinosearchIndex}`;
  res.render('dinosaurs/show', { title, dino: dinosaurs[dinosearchIndex] });
});

//////////////// SEARCH W/ QUERY
// use query string
dinoRouter.get('/search', (req, res) => {
  console.log('---GET (search w/ query)---', req.query);
  const dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  const queryDinoName = req.query.name;
  const queryDinoType = req.query.type;

  let dinoQuery = dinosaurs.filter((dino) => {
    return dino.name.toLowerCase() == queryDinoName;
  });

  console.log(dinoQuery)

  const title = `query dino ${queryDinoName}`;
  res.render('dinosaurs/index', { title, dinosaurs: dinoQuery });
});
/////////////////////////////////////////////////////






/////////////////////////// DELETE

dinoRouter.get('/delete', (req, res) => {
  console.log('---GET (for del)---');
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  res.render('dinosaurs/delete', {title: 'delete a dino', dinosaurs});
});


dinoRouter.delete('/:index', (req, res) => {
  console.log('---DELETE (for del)---', req.params);
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  const index = parseInt(req.params.index);

  dinosaurs.splice(index, 1);

  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  res.redirect('/dinosaurs');
});











/////////////////////// PUT
dinoRouter.get('/edit/:index', (req, res) => {
  console.log('---GET (for edit/put)---', req.params);
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  const index = req.params.index;
  const dino = dinosaurs[index];
  const title = `edit dino at index ${index}`;
  res.render('dinosaurs/edit', { title, dino, index });
});

dinoRouter.put('/:index', (req, res) => {
  console.log('---PUT (for edit/put))---', req.params);
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  const index = req.params.index;
  dinosaurs[index].name = req.body.name;
  dinosaurs[index].type = req.body.type;

  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  res.redirect('/dinosaurs');
});










//////////////// GET 1 dino w/ params
// show only one dino at an index
dinoRouter.get('/:index', (req, res) => {
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  //get array index from url parameter
  let index = parseInt(req.params.index);
  const title = `dino at index: ${index}`;
  res.render('dinosaurs/show', { title, dino: dinosaurs[index] });
  //render page with data of the specified animal
  //console.log(dinosaurs[dinoIndex])
  //res.render('dinosaurs/show', {dinosaurs[dinoIndex]});
});













module.exports = dinoRouter;
