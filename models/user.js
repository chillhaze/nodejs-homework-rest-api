const { Schema, model } = require('mongoose')
const Joi = require('joi')
const bcrypt = require('bcryptjs')

const userSchema = Schema(
  {
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verification token is required'],
    },
  },
  { versionKey: false, timestamps: true },
)

// Второй вариант хеширования пароля для Register
userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

// Второй вариант хеширования пароля для Login
userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

// Vallidation schema Register
const joiRegisterSchema = Joi.object({
  // name: Joi.string().required(),
  email: Joi.string().required(),
  // email: Joi.string().email({
  //   minDomainSegments: 2,
  //   tlds: { allow: ['com', 'net', 'ru', 'ua', 'uk', 'org', 'ca'] },
  // }),
  password: Joi.string().required(),
})

// Vallidation schema Login
const joiLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
})

const User = model('user', userSchema)

module.exports = {
  User,
  joiRegisterSchema,
  joiLoginSchema,
}
