import Joi from 'joi'

export const translationValidation = () => {
  return Joi.object({
    text: Joi.string().required().messages({
      'string.empty': 'text is required',
      'any.required': 'text is required'
    })
  })
}
