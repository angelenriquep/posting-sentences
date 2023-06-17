import { body, query, validationResult } from 'express-validator';

export const translationValidation = () => [
  body('text')
    .notEmpty()
    .withMessage('text is required'),
];

export const addSentenceValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}