var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema({
    content : String,
    input : String,
    output : String
});

module.exports = mongoose.model('Task',taskSchema);