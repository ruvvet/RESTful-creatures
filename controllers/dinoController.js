const dinoRouter = require('express').Router();
// lets us read/parse json files
const fs = require('fs');

//dinoRouter.use(express.urlencoded({ extended: false })); //does this go here or in index.js?????

// dont keep it global
// //let dinosaurs = fs.readFileSync('./dinosaurs.json'); // reads the json file
// //let dinoData = JSON.parse(dinosaurs)  // parses the data into json
// let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));

// create dinosaurs route to show all dinos
dinoRouter.get('/', (req, res) => {
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  res.render('dinosaurs/index', { title: 'all dinos', dinosaurs });
});

// needs to be above show route since it checks sequentially
dinoRouter.get('/new', (req, res) => {
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  res.render('dinosaurs/new', {title:'create a new dino'});
});

dinoRouter.post('/', (req, res) => {
  let dinosaurs = JSON.parse(fs.readFileSync('./dinosaurs.json'));
  let newDino = req.body;
  dinosaurs.push(newDino);
  fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinosaurs));
  res.redirect('/dinosaurs');
});

//

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
