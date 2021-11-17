const router = require('express').Router();
const { celebrate } = require('celebrate');
const Joi = require('joi-oid');
const {
  getUsers, getUser, updateUser, updateAvatarUser, getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.objectId(),
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }).unknown(true),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com|)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }).unknown(true),
}), updateAvatarUser);

module.exports = router;
