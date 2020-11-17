const cryptidRouter = require('express').Router();
const fs = require('fs');

// create dinosaurs route to show all dinos
cryptidRouter.get('/', (req, res) => {
  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'));
  res.render('cryptids/index', { title: 'All the Cryptids', cryptids });
});

// needs to be above show route since it checks sequentially
cryptidRouter.get('/new', (req, res) => {
  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'));
  res.render('cryptids/new', { title: 'insert a new cryptid' });
  // this only renders the form input
});

cryptidRouter.post('/', (req, res) => {
    console.log(req.body);
    // we take the returned  body parameter from the request of the input form
    // it comes in the form data as an object with a key:value for every forms KEY>(name=) and VALUE>(user input)

  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'));
  let newCryptid = req.body;
  // push the object into the cryptids object
  cryptids.push(newCryptid);
  // then overwrite the object as the new cryptids json file
  fs.writeFileSync('./cryptids.json', JSON.stringify(cryptids));
  res.redirect('/cryptids');
});

// show only one dino at an index
cryptidRouter.get('/:index', (req, res) => {
  let cryptids = JSON.parse(fs.readFileSync('./cryptids.json'));
  //get array index from url parameter
  let index = parseInt(req.params.index);
  const title = `cryptid at index: ${index}`;
  res.render('cryptids/show', { title, cryptid: cryptids[index] });
});

module.exports = cryptidRouter;
