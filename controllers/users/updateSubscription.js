const { User } = require('../../models')

const updateSubscription = async (req, res) => {
  const { _id, subscription } = req.user
  const newSubscription = req.body.subscription

  const user = await User.findByIdAndUpdate(
    { _id: _id },
    { subscription: newSubscription },
  )

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

module.exports = updateSubscription
