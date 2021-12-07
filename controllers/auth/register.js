const { Conflict } = require('http-errors')
// const bcrypt = require('bcryptjs')

const { User } = require('../../models')

const register = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict(`User with email ${email} already exist`)
  }

  // Первый вариант хеширования пароля для Register
  // const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  // const result = await User.create({ name, email, password: hashPassword })

  // Второй вариант хеширования пароля для Register
  const newUser = new User({ email, password })
  newUser.setPassword(password)
  newUser.save()

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      message: `User ${email} created.`,
      user: {
        email,
      },
    },
  })
}

module.exports = register
