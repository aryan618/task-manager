const mongoose = require("mongoose");
// using schema we will create structures for all the documents that we will have in our collection
const TaskSchema = new mongoose.Schema({
  // only the properties we set in the schema will be passed on to the database and everything else will be ignored
  name: {
    type: String,
    required: [true, "it should be present in the schema"],
    trim: true,
    maxlength: 20,
  },
  completed: {
    type: Boolean,
    //default: false,// if this will be there then there will be no difference between put and patch
  },
});
// in mongoose a model is a wrapper for the schema...mongoose model provides interface to the database so using the model we will be able to create and update query our documents with great ease

module.exports = mongoose.model("Task", TaskSchema); // now go to the controller and start using the model
