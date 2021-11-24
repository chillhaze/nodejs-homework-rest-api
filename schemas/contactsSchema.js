const Joi = require('joi')

// Vallidation schema
const contactsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
    })
    .required(),
  phone: Joi.string().min(10).max(14).required(),
})

module.exports = contactsSchema
