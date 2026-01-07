require("dotenv").config();
const mongoose = require("mongoose");

const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/todoDB";

mongoose.connect(mongoURI)
  .then(() => console.log("Mongo connected"))
  .catch(err => console.error(err));

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }
})

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}