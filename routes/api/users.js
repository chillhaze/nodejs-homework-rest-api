const express = require('express')

const { authUser, ctrlWrapper } = require('../../middlewares')
const { userControllers: ctrl } = require('../../controllers')

const router = express.Router()

// get current user
router.get(
  '/current',
  authUser,
  ctrlWrapper(ctrl.UserControllers.getCurrentUser),
)

// change subscription
router.patch(
  '/current/subscription',
  authUser,
  ctrlWrapper(ctrl.UserControllers.updateSubscription),
)

module.exports = router
