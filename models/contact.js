const { Schema, model, SchemaTypes } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      // название коллекции откуда берем id
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
)

// Vallidation schema
const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
  }),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})

// Vallidation schema patch route
const joiUpdateStatusSchema = Joi.object({
  favorite: Joi.string().valid(true, false).required(),
})

const Contact = model('contact', contactSchema)

module.exports = {
  Contact,
  joiSchema,
  joiUpdateStatusSchema,
}
