import { body, query, validationResult } from 'express-validator'

export const sentenceValidationRulesAddSentence = () => [
  body('text').notEmpty().withMessage('text field is required'),
  body('category').notEmpty().withMessage('category field is required'),
  body('skills')
    .notEmpty().withMessage('cats field is required')
    .isObject().withMessage('cats field should be a list')
]

export const sentenceValidationRulesGetSentence = () => [
  query('order')
    .optional()
    .trim()
    .isIn(['desc', 'asc']).withMessage('Only desc, asc allowed'),
  query('offset')
    .optional()
    .trim()
    .isNumeric().withMessage('Offset is numeric')
    .isLength({ min: 1, max: 3 }).withMessage('lmt is required'),
  query('lmt')
    .optional()
    .trim()
    .isNumeric().withMessage('lmt is numeric')
    .isLength({ min: 1, max: 3 }).withMessage('lmt is required')
]

export const addSentenceValidation = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({
    [err.param]: err.msg
  }))

  return res.status(422).json({
    errors: extractedErrors
  })
}
