const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const { SECRET_KEY } = process.env
const { Conflict } = require('http-errors')

class AuthControllers {
  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

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

  async logout(req, res) {
    const { _id } = req.user
    await User.findByIdAndUpdate(_id, { token: null })

    res.status(204).json()
  }

  async register(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      throw new Conflict(`User with email ${email} already exist`)
    }

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
}

module.exports = new AuthControllers()
