const express = require('express')

const { authUser, ctrlWrapper } = require('../../middlewares')
const { usersControllers: ctrl } = require('../../controllers')

const router = express.Router()

// get current user
router.get('/current', authUser, ctrlWrapper(ctrl.getCurrentUser))

// change subscription
router.patch(
  '/current/subscription',
  authUser,
  ctrlWrapper(ctrl.updateSubscription),
)

module.exports = router
