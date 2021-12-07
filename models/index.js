const { Contact, joiSchema, joiUpdateStatusSchema } = require('./contact')
const { User, joiRegisterSchema, joiLoginSchema } = require('./user')

module.exports = {
  Contact,
  joiSchema,
  joiUpdateStatusSchema,
  User,
  joiRegisterSchema,
  joiLoginSchema,
}
