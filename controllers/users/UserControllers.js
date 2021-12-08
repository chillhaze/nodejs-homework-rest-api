const { User } = require('../../models')
const path = require('path')
const fs = require('fs/promises')

class UserControllers {
  async getCurrentUser(req, res) {
    const { email, subscription, avatarURL } = req.user
    res.status(200).json({
      status: 'success',
      code: 201,
      data: {
        user: {
          email,
          subscription,
          avatarURL,
        },
      },
    })
  }

  async updateSubscription(req, res) {
    const { _id, subscription } = req.user
    const newSubscription = req.body.subscription
    const user = await User.findByIdAndUpdate(
      { _id: _id },
      { subscription: newSubscription },
    )
    console.log(user)
    const subscriptionRules = ['starter', 'pro', 'business']
    if (!subscriptionRules.includes(newSubscription)) {
      res.status(200).json({
        status: 'success',
        code: 200,
        messsage: `Choose correct type of subscription: ${subscriptionRules})`,
      })
    }
    if (subscription === newSubscription) {
      res.status(200).json({
        status: 'success',
        code: 200,
        messsage: `Previous subscription (${subscription}) is equal to a new subscription (${newSubscription})`,
      })
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        messsage: `Congratulations! Subscription changed from ${subscription} to ${newSubscription}`,
      },
    })
  }

  async updateAvatar(req, res) {
    const { path: tempUpload, originalname } = req.file
    const { _id: id } = req.user
    const imageName = `${id}_${originalname}`

    const avatarUrl = path.join(__dirname, '../../', 'public', 'avatars')

    try {
      const resultUpload = path.join(avatarUrl, imageName)

      await fs.rename(tempUpload, resultUpload)

      const avatarURL = path.join('public', 'avatars', imageName)

      await User.findByIdAndUpdate(req.user._id, { avatarUrl })

      res.json({ avatarURL })
    } catch (error) {
      await fs.unlink(tempUpload)
      throw error
    }
  }
}
module.exports = new UserControllers()
