import { body } from 'express-validator';

export const signupValidation = () => [
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username field is required')
    .isString()
    .withMessage('Username must be a string')
    .isLength({ min: 2 })
    .withMessage('Username must be at least 2 characters')
    .escape(),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password field is required')
    .isString()
    .withMessage('Password must be a string')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters'),
];
