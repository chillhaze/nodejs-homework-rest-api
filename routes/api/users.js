const express = require('express')

const { authUser, upload, ctrlWrapper } = require('../../middlewares')
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

// update avatar
router.patch(
  '/avatars',
  authUser,
  upload.single('avatar'),
  ctrlWrapper(ctrl.UserControllers.updateAvatar),
)

module.exports = router
