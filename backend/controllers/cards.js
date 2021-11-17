const Card = require('../models/card');
const { NotFoundError } = require('../components/NotFoundError');
const { NotValidData } = require('../components/NotValidData');
const { MethodNotAllowed } = require('../components/MethodNotAllowed');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('user')
    .then((card) => res.send(card))
    .catch((err) => next(err));
};

module.exports.createCard = (req, res, next) => {
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id,
  })
    .then((card) => res.send(card))
    .catch((err) => {
      res.send(err);
      if (err.name === 'ValidationError') {
        throw new NotValidData('Переданы неккоретные данные');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      }
      if (req.user._id != card.owner) {
        throw new MethodNotAllowed('Метод не дозволен');
      } else {
        Card.findByIdAndRemove(req.params.cardId)
          .then(() => res.status(200).send({ message: 'Карточка удалена' }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidData('Переданы неккоретные данные');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidData('Переданы неккоретные данные');
      }
      next(err);
    })
    .catch((err) => next(err));
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new NotValidData('Переданы неккоретные данные');
      }
      next(err);
    })
    .catch((err) => (err));
};
