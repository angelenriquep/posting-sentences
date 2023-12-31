import { body, query, validationResult, param } from 'express-validator'

export const sentenceValidationRulesAddSentence = () => [
  body('text').notEmpty().withMessage('text field is required'),
  body('category').notEmpty().withMessage('category field is required'),
  body('skills')
    .notEmpty().withMessage('skills field is required')
    .isObject().withMessage('skills field should be a list')
]

export const sentenceValidationRulesGetSentence = () => [
  query('order')
    .optional()
    .trim()
    .isIn(['desc', 'asc']).withMessage('Only desc, asc allowed'),
  query('page')
    .optional()
    .trim()
    .isNumeric().withMessage('page is numeric')
    .isLength({ min: 1, max: 3 }).withMessage('page is exceed length'),
  query('pageSize')
    .optional()
    .trim()
    .isNumeric().withMessage('pageSize is numeric')
    .isLength({ min: 1, max: 3 }).withMessage('pageSize exceed length')
]

export const requestValidation = (req, res, next) => {
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

export const containsIdParamRules = () => [
  param('id').exists().withMessage('id is required field in the URL')
]
