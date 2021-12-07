const { Contact } = require('../../models')

const updateStatusContact = async (req, res) => {
  const { favorite } = req.body
  const { contactId } = req.params
  const { _id } = req.user

  const result = await Contact.findByIdAndUpdate(
    { _id: contactId, owner: _id },
    { favorite },
    {
      new: true,
    },
  )

  // if (!body) {
  //   const error = new Error('missing field favorite')
  //   error.status = 404
  //   throw error
  // }

  if (!result) {
    const error = new Error('Not found')
    error.status = 404
    throw error
  }

  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result,
    },
  })
}

module.exports = updateStatusContact
