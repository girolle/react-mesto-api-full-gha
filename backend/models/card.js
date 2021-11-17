const mongoose = require('mongoose');

const regex = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com|)))(:\d{2,5})?((\/.+)+)?\/?#?/;

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return regex.test(v);
      },
      message: 'Неккоректная ссылка',
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: Array,
    default: [],
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
