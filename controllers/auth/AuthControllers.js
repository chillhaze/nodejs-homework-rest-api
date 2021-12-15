const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')
const { User } = require('../../models')
const { SECRET_KEY } = process.env
const { Conflict } = require('http-errors')
const { nanoid } = require('nanoid')
const { sendEmail } = require('../../helpers')

const gravatar = require('gravatar')

class AuthControllers {
  async login(req, res) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (!user || !user.comparePassword(password)) {
      throw new Unauthorized('Email or password is wrong')
    } else if (!user.verify) {
      throw new Unauthorized('Email is not verified')
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

    const verificationToken = nanoid()

    const avatarURL = gravatar.url(email)
    const newUser = new User({ email, password, avatarURL, verificationToken })
    newUser.setPassword(password)

    await newUser.save()

    const mail = {
      to: email,
      subject: 'Email confirmation',
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Confirm email</a>`,
    }

    await sendEmail(mail)

    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        message: `User ${email} created.`,
        user: {
          email,
          avatarURL,
          verificationToken,
        },
      },
    })
  }

  async verifyEmail(req, res) {
    const { verificationToken } = req.params
    const user = await User.findOne({ verificationToken })

    if (!user) {
      res.status(404).json({
        message: 'User not found',
      })
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    })

    res.status(200).json({
      message: 'Verification successful',
    })
  }

  async resendEmail(req, res) {
    const { email } = req.body
    if (!email) {
      res.status(400).json({
        message: 'missing required field email',
      })
    }

    const user = await User.findOne({ email })

    if (!user) {
      res.status(404).json({
        message: `User ${email} not found`,
      })
    }

    if (user.verify) {
      res.status(400).json({
        message: 'Verification has already been passed',
      })
    }

    const verificationToken = user.verificationToken

    const mail = {
      to: email,
      subject: 'Email confirmation',
      html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Confirm email</a>`,
    }

    await sendEmail(mail)

    res.status(200).json({
      status: 'ok',
      message: 'Verification email sent',
    })
  }
}

module.exports = new AuthControllers()
