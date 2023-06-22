import Joi from 'joi'

export const sentenceValidationRulesGetSentence = () => {
  return Joi.object({
    order: Joi.string().valid('desc', 'asc').optional().trim()
      .messages({
        'any.only': 'Only desc, asc allowed'
      }),
    page: Joi.number().integer().optional().trim()
      .min(1).max(999).messages({
        'number.base': 'page is numeric',
        'number.min': 'page is below the minimum allowed value',
        'number.max': 'page is exceed the maximum allowed value'
      }),
    pageSize: Joi.number().integer().optional().trim()
      .min(1).max(999).messages({
        'number.base': 'pageSize is numeric',
        'number.min': 'pageSize is below the minimum allowed value',
        'number.max': 'pageSize exceed the maximum allowed value'
      })
  })
}

export const sentenceValidationRulesAddSentence = () => {
  return Joi.object({
    text: Joi.string().required().messages({
      'string.empty': 'text field is required',
      'any.required': 'text field is required'
    }),
    category: Joi.string().required().messages({
      'string.empty': 'category field is required',
      'any.required': 'category field is required'
    }),
    skills: Joi.array().required().messages({
      'array.empty': 'skills field is required',
      'any.required': 'skills field is required'
    })
  })
}
