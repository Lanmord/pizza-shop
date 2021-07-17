import { body } from 'express-validator';

export const registerValidations = [
  body('email', 'Введите E-mail').isEmail().withMessage('Неверный E-mail'),

  body('fullname', 'Введите имя')
    .isString()
    .isLength({
      min: 2,
      max: 40,
    })
    .withMessage('Допустимое кол-во символов в имени от 2 до 40.'),

  body('password', 'Введите пароль')
    .isLength({ min: 5 })
    .withMessage('Минимальное кол-во символов в пароле 5 символов')
    .custom((value, { req }) => {
      if (value !== req.body.password2) {
        throw new Error('Пароли не совподают');
      } else {
        return value;
      }
    }),
];
