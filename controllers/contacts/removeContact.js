const { Contact } = require('../../models')

const removeContact = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndRemove({ _id: contactId })
  if (!result) {
    const error = new Error(`Contact with id: ${contactId} not found`)
    error.status = 404
    throw error
  }
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'contact deleted',
    data: {
      result,
    },
  })
}

module.exports = removeContact
