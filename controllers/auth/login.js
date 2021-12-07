const { Unauthorized } = require('http-errors')
// const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../../models')

const { SECRET_KEY } = process.env

const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // Первый вариант хеширования пароля для Login
  // if (!user) {
  //   throw new Unauthorized(`Email ${email} not found`)
  // }
  // const passCompare = bcrypt.compareSync(password, user.password)
  // if (!passCompare) {
  //   throw new Unauthorized('Password wrong')
  // }

  // Второй вариант хеширования пароля для Login
  if (!user || !user.comparePassword(password)) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' })
  await User.findByIdAndUpdate(user._id, { token })
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      user: {
        email: user.email,
        subscription: user.subscription,
        token: user.token,
      },
    },
  })
}

module.exports = login
