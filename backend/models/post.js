const mongoose = require('mongoose');

//shcema is a blue print
const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

//set up the model
module.exports = mongoose.model('Post', postSchema);


