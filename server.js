'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;
const mongoose = require('mongoose'); // 0 - import mongoose

// mongoose config
mongoose.connect(`${process.env.url}`, {useNewUrlParser: true, useUnifiedTopology: true}); // 1 - connect mongoose with DB (books)

let Bookmodel = require('./schema');  //file do //define the schema (structure) &compile the schem into a model

// access req.body
app.use(express.json());


//seed data (insert initial data)
async function seedData(){
  const firstBook = new Bookmodel({
    title: "Do Androids Dream of Electric Sheep",
    description: "It was January 2021, and Rick Deckard had a license to kill.Somewhere among the hordes of humans out there, lurked several rogue androids. Deckard's assignment--find them and then...'retire' them. Trouble was, the androids all looked exactly like humans, and they didn't want to be found",
    status: "Available"
  })

  const secondBook = new Bookmodel({
    title: "Moloka'i",
    description: "Set in Hawai'i more than a century ago, this is the story of Rachel Kalama, a spirited seven-year-old Hawaiian girl, who dreams of visiting far-off lands like her father, a merchant seaman. Then one day a rose-colored mark appears on her skin, and those dreams are stolen from her. Taken from her home and family, Rachel is sent to Kalaupapa, the quarantined leprosy settleme",
    status: "Available",
  })

  const thirdBook = new Bookmodel({
    title: "The Secret Garden",
    description: "After the death of her parents, Mary Lennox is brought back from India as a forlorn and unwanted child to live in her uncle's great lonely house on the moors. Then one day, she discovers the key to a secret garden and, as if by magic, her life begins to change.",
    status: "Available"
  })

  await firstBook.save();
  await secondBook.save();
  await thirdBook.save();
}


// seedData(); //call seedData function once

// http://localhost:3001/test
app.get('/test', (request, response) => {

  response.send('test request received')

})
// http://localhost:3001/books

let getbooksHandler = (req,res) =>{

  Bookmodel.find({},(err,result)=>{
    if(err)
    {
        console.log(err);
    }
    else
    {
        // console.log(result);
        res.json(result);
    }
  })
}
async function addbookHandler(req,res) {
  console.log(req.body);
  
  const {title, description ,status} = req.body; //Destructuring assignment
  await Bookmodel.create({
    title : title,
    description : description,
    status:status
  });

  Bookmodel.find({},(err,result)=>{
      if(err)
      {
          console.log(err);
      }
      else
      {
          // console.log(result);
          res.json(result);
      }
  })
}


app.get('/books',getbooksHandler);
app.post('/books',addbookHandler);


app.listen(PORT, () => console.log(`listening on ${PORT}`));
