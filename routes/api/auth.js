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
  ctrlWrapper(ctrl.register),
)

// Sign in user
router.post(
  '/login',
  // Вместо '/login' можно использовать в эндпоинте "/signin"
  validation(joiLoginSchema),
  ctrlWrapper(ctrl.login),
)

// Log out user
// тк нет тела запроса, лучше писать get, а не post
router.post('/logout', authUser, ctrlWrapper(ctrl.logout))
// Вместо '/logout' можно использовать в эндпоинте "/signout"
module.exports = router
