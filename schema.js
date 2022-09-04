
const mongoose = require('mongoose'); // 0 - import mongoose




const Bookschema = new mongoose.Schema({ //define the schema (structure)
    title: String,
    description: String,
    status: String
  
  });
  const Bookmodel = mongoose.model('book', Bookschema); //compile the schem into a model
  

  module.exports = Bookmodel;
