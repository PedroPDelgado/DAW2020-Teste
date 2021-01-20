const mongoose = require('mongoose')

var batismoSchema = new mongoose.Schema({
    _id: {type: String, required: true},
    date: String,
    title: String,
    ref: String,
    href: String,
    Pai: String,
    Mae: String,
    ano: Number,
    batizado: String,
  });

module.exports = mongoose.model('batismo', batismoSchema) 