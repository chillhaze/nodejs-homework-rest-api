const express = require('express')

const { authUser, validation, ctrlWrapper } = require('../../middlewares')
const { joiRegisterSchema, joiLoginSchema } = require('../../models')
const { authControllers: ctrl } = require('../../controllers')

const router = express.Router()

// Sign up user
router.post(
  // Вместо '/register' можно использовать в эндпоинте "/signup"
  '/register',
  validation(joiRegisterSchema),
  ctrlWrapper(ctrl.AuthControllers.register),
)

// Sign in user
router.post(
  '/login',
  // Вместо '/login' можно использовать в эндпоинте "/signin"
  validation(joiLoginSchema),
  ctrlWrapper(ctrl.AuthControllers.login),
)

// Log out user
// тк нет тела запроса, лучше писать get, а не post
router.post('/logout', authUser, ctrlWrapper(ctrl.AuthControllers.logout))
// Вместо '/logout' можно использовать в эндпоинте "/signout"

// update verification
router.get(
  '/verify/:verificationToken',
  ctrlWrapper(ctrl.AuthControllers.verifyEmail),
)

// resend verification email
router.post('/verify', ctrlWrapper(ctrl.AuthControllers.resendEmail))

module.exports = router
