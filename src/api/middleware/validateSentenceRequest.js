import { validationResult, param } from 'express-validator'

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
