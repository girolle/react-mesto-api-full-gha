const mongoose = require('mongoose');
const { isEmail } = require('validator');

const linkRegex = /(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com|)))(:\d{2,5})?((\/.+)+)?\/?#?/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Неккоректный email',
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
    required: false,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
    required: false,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return linkRegex.test(v);
      },
      message: 'Неккоректная ссылка',
    },
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    required: false,
  },
});

module.exports = mongoose.model('user', userSchema);
